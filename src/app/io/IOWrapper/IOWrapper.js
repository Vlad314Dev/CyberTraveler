import io from 'socket.io-client';

class IOWrapper
{
    constructor()
    {
        if (navigator.onLine) {
            this.socket = io();
        }
    }
    
    emit(ev, ...args)
    {
        if (navigator.onLine) {
            this.socket.emit(ev, args);
        }
    }
}

export default IOWrapper;