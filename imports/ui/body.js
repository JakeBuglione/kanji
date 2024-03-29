import { Template } from 'meteor/templating';
//Load in Templates
import './body.html';
import './kanji.js';
import './listItems.js'


//Load in Mongo collections
import { Kanjis } from '../api/kanjis.js'

//create reactiveDict when body is created
Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    
});

Template.body.helpers({
    /*kanjis:[
        {text: 'ichi'},
        {text: 'ni'},
        {text: '漢'},
        {text: '字'},
    ],*/
    //Allow you to change modes
    modeStat() {
        const instance = Template.instance();
        console.log(1==instance.state.get('mode'));
        return 1 == instance.state.get('mode');
    },
    modeList() {
        const instance = Template.instance();
        return 3 == instance.state.get('mode');
    },
    //Kanji Helpers
    kanjis() {
        //console.log(Kanjis.find());
        return Kanjis.find();
    },
    oneKanjis() {
        //Look into using aggregate to return a random sample

        /*return Kanjis.aggregate(
            [
                {$sample: {size:1}},
            ]
        );*/
        return Kanjis.findOne({ practiced: false });
    },
    //Finds the number of kanji left to study    
    kanjiCount() {
        return Kanjis.find({ practiced: false }).count();
    },
    //Checks if there are no kanji left to study
    noneLeft(){
        return Kanjis.find({ practiced: false }).count()==0;
    }
});

Template.body.events({
    'submit .new-kanji'(event) {
        event.preventDefault(); //stops default form submit

        //get input from form
        const target = event.target;
        const kanji = target.kanji.value;
        const desc = target.description.value;

        //put new kanji into collection
        Kanjis.insert({
            text:kanji,
            description:desc,
            timesPracticed:0,
            timesCorrect:0,
            practiced:false,
             });

        target.kanji.value = '';//blanks out form

    },
    'click .statsMode'(event, instance) {
        instance.state.set('mode', 1);
    },
    'click .learnMode'(event, instance) {
        instance.state.set('mode', 2);
    },
    'click .listMode'(event, instance) {
        instance.state.set('mode', 3);
    },
    //may not work properly after made safe
    //db.kanjis.update({},{$set:{practiced:false}},{multi:true});
    'click .noneLeft'(){
        console.log('testing');
        // update may be broken by meteor for now run manually.
        Kanjis.update({},{practiced:false},{multi:true});
        console.log('worked');
    },
});