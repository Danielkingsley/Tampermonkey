// ==UserScript==
// @name         Testrail-Self Audit Tool
// @namespace    http://tampermonkey.net/
// @version      1.3
// @updateURL    https://github.com/Danielkingsley/Tampermonkey/raw/main/JIRA_Self_Audit.user.js
// @downloadURL  https://github.com/Danielkingsley/Tampermonkey/raw/main/JIRA_Self_Audit.user.js
// @description  TestRail self audit tool
// @author       CoRo - VESTA
// @match        https://testrail.vesta.amazon.dev/index.php?/*
// @grant        none
// ==/UserScript==

var $ = window.jQuery;
(function() {
    'use strict';
    var now = new Date();
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8,30, 0, 0) - now;
if (millisTill10 < 0) {
     millisTill10 += 86400000; // update build number.
}
setTimeout(function(){alert("Update Build Number!!")}, millisTill10);
    // Creating Version Input box for User to enter the Version
    var versionInput = '<div><label>Version: </label><input type="text" id="version"></div>';
    $(versionInput).insertBefore('#groupContainer');

    //Get the value from local Storage and place it in the input box
    $('#version').val(localStorage.getItem('version'));

    // Initially set the version value to be localStorage Value.
    var version = localStorage.getItem('version');

    //Copy the Version that the user types in the input box
    $('#version').on('keyup', function() {
        if (this.value.length > 1) {
            version = this.value.trim();
            window.localStorage.setItem("version", version);
        }
      document.getElementById("addResultSubmit").onclick = function click() {
        var value = $('#addResultVersion').val().trim();
        //console.log(value, version);
        if(value !== version ) {
            alert("Invalid Version\nToday's Version is: "+ version);
            setTimeout(function() {$('.editChange').first()[0].childNodes[1].onclick(); }, 3000);
            return false;
        }}
    });

    document.getElementById("addResultSubmit").onclick = function click() {
        var value = $('#addResultVersion').val().trim();
        //console.log(value, version);
        if(value !== version ) {
            alert("Invalid Version\nToday's Version is: "+ version);
            setTimeout(function() {$('.editChange').first()[0].childNodes[1].onclick(); }, 3000);
            return false;
        }

        /*<option value="1" selected="selected">Passed</option>
        <option value="2">Blocked</option>
        <option value="4">Retest</option>
        <option value="5">Failed</option>
        <option value="6">Skipped</option>
        <option value="7">Performance</option>
        <option value="8">Queried</option>
        <option value="9">Parked</option>
        <option value="10">Running</option>
        <option value="11">Caution</option>
        <option value="12">Not Applicable</option> */

    document.getElementById("addResultSubmit").onclick = function click() {
        if ($('#addResultStatus').val() === "5" || $('#addResultStatus').val() === "2" || $('#addResultStatus').val() === "8" || $('#addResultStatus').val() === "11") {
            if(!$('#addResultDefects').val().trim()) {
                alert('Defect Id not Tagged | Please tag a valid defect ID');
                setTimeout(function() {$('.editChange').first()[0].childNodes[1].onclick(); }, 3000);
                return false;
            }
        }

    }
}
}
)();
