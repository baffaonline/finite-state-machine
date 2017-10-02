class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (config !== undefined){
        this.config = config;
        this.currentState = this.config.initial;
        this.history = [this.currentState];
        this.index = 0;
      }
      else throw new Error();
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (state in this.config.states){
        this.currentState = state;
        this.history.push(state);
        this.index++;
      }
      else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      var curState = this.config.states[this.currentState];
      if (event in curState.transitions){
        this.changeState(curState.transitions[event]);
      }
      else throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.currentState = this.config.initial;
      this.history.push(this.config.initial);
      this.index++;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var arr = [];
      if (event !== undefined){
        for (let st in this.config.states){
          if (event in this.config.states[st].transitions)
            arr.push(st);
        }
      }
      else {
        for (let st in this.config.states){
          arr.push(st);
        }
      }
      return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.index != 0){
        this.currentState = this.history[this.index - 1];
        this.index--;
        return true;
      }
      else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.index != this.history.length - 1){
        this.currentState = this.history[this.index + 1];
        this.index++;
        return true;
      }
      return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.history = [this.currentState];
      this.index = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
