export default class Engine {
    constructor() {
        this.stockfish = new Worker("/stockfish.js");
        this.queue = [];
        this.loaded = false;
        
        this.onMessage = (data) => {
            console.log("Engine:", data);
        };

        this.stockfish.onmessage = (event) => {
            const line = event.data;
            if (line === 'uciok') {
                this.loaded = true;
                this.processQueue();
            }
            if (this.onMessage) {
                this.onMessage(line);
            }
        };

        this.stockfish.postMessage("uci");
    }

    processQueue() {
        while (this.queue.length > 0) {
            const command = this.queue.shift();
            this.stockfish.postMessage(command);
        }
    }

    evaluatePosition(fen, depth = 10) {
        if (!this.loaded) {
            this.queue.push(`position fen ${fen}`);
            this.queue.push(`go depth ${depth}`);
            return;
        }
        this.stockfish.postMessage(`position fen ${fen}`);
        this.stockfish.postMessage(`go depth ${depth}`);
    }

    stop() {
        this.stockfish.postMessage("stop");
    }

    quit() {
        this.stockfish.postMessage("quit");
    }
}
