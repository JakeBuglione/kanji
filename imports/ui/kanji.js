import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import './kanji.html';

import { Kanjis } from '../api/kanjis.js';
import './canvas.js'

//create reactiveDict when kanji is created
Template.kanji.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    //prepare canvas
    //canvasContext = this.getElementById('kanji-canvas').getContext("2d");
});

Template.kanji.helpers({
    stageTwo() {
        const instance = Template.instance();
        return instance.state.get('secondStage');
    },

});
Template.kanji.events({
    'click .check-answer'(event, instance) {
        //Set a flag to change buttons and layout for answer checking
        instance.state.set('secondStage', true);
    },

    'click .correct-answer'(event, instance) {
        //Reset to first stage
        instance.state.set('secondStage', false);
        Kanjis.update(this._id, {
            $set: {
                timesPracticed: this.timesPracticed += 1,
                timesCorrect: this.timesCorrect += 1,
                practiced: true,
            },
        });
    },

    'click .incorrect-answer'(event, instance) {
        //Reset to first stage
        instance.state.set('secondStage', false);
        Kanjis.update(this._id, {
            $set: { timesPracticed: this.timesPracticed += 1 },
        }); 
    },
});
