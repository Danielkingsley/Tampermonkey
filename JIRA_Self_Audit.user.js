// ==UserScript==
// @name         JIRA Self Audit
// @namespace    http://tampermonkey.net/
// @version      1.1
// @updateURL    https://github.com/Danielkingsley/Tampermonkey/raw/main/JIRA_Self_Audit.user.js
// @downloadURL  https://github.com/Danielkingsley/Tampermonkey/raw/main/JIRA_Self_Audit.user.js
// @description  Making Testers life simple
// @author       Daniel Kingsly (xkidanie)
// @match        https://issues.labcollab.net/browse/*
// @grant        none
// ==/UserScript==

var input = document.createElement("input");
input.type = "button";
input.value = "JIRA Self Audit";
input.onclick = Jira_self_audit;
input.setAttribute("style", "font-size:18px;position:absolute;bottom:120px;right:40px;");
document.body.appendChild(input);

var $ = window.jQuery;

function Jira_self_audit()
{
var type = document.getElementById("type-val");
var affected_version = document.getElementById("versions-field");
var is_regression = document.getElementById("customfield_11301-val");
var severity = document.getElementById("customfield_10501-val");
var reproducibitlity = document.getElementById("customfield_10003-val");
var is_triaged = document.getElementById("customfield_11302-val");
var project = document.getElementById("customfield_10704-val");
var how_found = document.getElementById("customfield_10812-val");
var devices_affected = document.getElementById("customfield_10400-val");
var labels = document.getElementsByClassName("labels-wrap value editable-field inactive");
var message = "";

    message += "MISSES \n \n";
    if (type != null) {
        console.log("Bug Type is added");
    }
    else{
        message += "Bug Type is not added\n";
    }

    if (affected_version != null) {
        console.log("Affected version is added");
    }
    else{
        message += "Affected version is missing\n";
    }
    if (labels != null) {
        console.log("Labels are added");
        alert(labels.value);
    }
    else{
        message += "Labels are missing\n";
    }

    if (is_regression != null) {
        console.log("isRegression (Yes/No) field is updated");
    }
    else{
        message += "isRegression (Yes/No) field is missing\n";
    }

    if (severity != null) {
        console.log("Severity field is updated");
    }
    else{
        message += "Severity field is missing\n";
    }

    if (reproducibitlity != null) {
        console.log("Reproducibility field is updated");
    }
    else{
        message += "Reproducibility field is missing\n";
    }

    if (is_triaged != null) {
        console.log("isTriaged field is updated");
        //alert("isTriaged is added");
    }
    else{
        message += "isTriaged field is missing\n";
    }

    if (project != null) {
        console.log("Project name field is updated");
    }
    else{
        message += "Project name field is missing\n";
    }


    if (how_found!= null) {
        console.log("How Found? field  is updated");
    }
    else{
        message += "How Found? field is missing\n";
    }

    if (devices_affected != null) {
        console.log("Devices Affected field is updated");
    }
    else{
        message += "Devices Affected field is missing\n";
    }

    message += "\n Make sure Test Case Link is added for QS-Direct issue. \n";

    if (message){
        alert(message+"\n");
    }
}
//Jira_self_audit();

var arr = []
var objSelect = document.getElementsByClassName("customfield_10704labels-wrap value editable-field inactive");
    for (var i = 0; i < objSelect.length; i++) {
        alert(objSelect.options[i].text);
    }
