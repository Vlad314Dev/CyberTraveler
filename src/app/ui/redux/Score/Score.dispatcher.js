import {
    addToScore
} from './Score.action';

export class ScoreDispatcher
{
    addToScore(options = {}, dispatch) {
        dispatch(addToScore(options.score));
    }
}

export default new ScoreDispatcher();
