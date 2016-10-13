import { Template } from 'meteor/templating';
import './listItems.html';

import { Kanjis } from '../api/kanjis.js';

Template.listItems.events({
    'click .delete-kanji'() {

        Kanjis.remove(this._id);
    },

});