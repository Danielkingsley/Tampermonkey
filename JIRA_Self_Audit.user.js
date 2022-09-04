// ==UserScript==
// @name         JIRA Self Audit
// @namespace    http://tampermonkey.net/
// @version      1.1
// @updateURL    https://github.com/Danielkingsley/Tampermonkey/raw/main/JIRA_Self_Audit.user.js
// @downloadURL  https://github.com/Danielkingsley/Tampermonkey/raw/main/JIRA_Self_Audit.user.js
// @description  A Tampermonkey userscript that helps testers to audit their bugs after they raised.
// @author       Daniel Kingsly (xkidanie)
// @match        https://issues.labcollab.net/browse/*
// @require      https://github.com/Danielkingsley/Tampermonkey/raw/main/toUnicodeVariant.js
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
let labels = document.getElementsByClassName("lozenge");
var description = document.getElementById("description-val");
var mandate_labels = ["vesta-qs" , "platform-qs"];
var message = "";
var label_list = "";
var label_found = [];
var all_label = [];

message += "==========================\n";
message += toUnicodeVariant("MANDATORY LABELS CHECK \n", 'bold sans');
message += ("Currently it'll only check for 'vesta-qs' & 'platform-qs'");
message += "\n==========================\n\n";

    //To loop through labels
    for (var i = 0;i < labels.length; i++) {
        all_label[i] =labels[i].textContent;
        label_list +=all_label[i]+"\n";
        label_found.push(all_label[i]);
    }

    if (label_found.includes("platform-qs")){message+="platform-qs label is present \n"} else {message+="platform-qs label is missing \n"}
    if (label_found.includes("vesta-qs")){message+="vesta-qs label is present \n"} else {message+="vesta-qs label is missing \n"}
    if (how_found!==null){
    if (how_found.textContent.trim() == "Regression"){if (label_found.includes("qs-direct")||label_found.includes("qs-indirect")){console.log("QS-direct/indirect label is present \n");} else {message+="QS-direct/indirect label is missing \n"}}
    if (how_found.textContent.trim() == "Regression"){if(label_found.includes("foundinmainline")||label_found.includes("foundinship") ){console.log("foundinship/mainline label is present \n");} else {message+="foundinship/mainline label is missing \n"}}
    if (how_found.textContent.trim() == "Regression"){if(label_found.includes("P0")||label_found.includes("P1")||label_found.includes("P2-P4")||label_found.includes("dct-qs")){console.log("P0/P1/P2/P3/P4 label is present \n");} else {message+="P0/P1/P2/P3/P4 label is missing \n"}}
    if (how_found.textContent.trim() == "Patch"){if(label_found.includes("patch-platform-qs")){console.log("Patch label is present \n");} else {message+="Platform Patch label is missing \n"}}
    }else {console.log("how_found field is missing")}

    message += "\n========\n";
    message += toUnicodeVariant("MISSES \n", 'bold sans', 'bold');
    message += "========\n\n";

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
        message += "Affected version is not added\n";
    }
    if (labels != null) {
        console.log("Labels are added");
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
    if (type != null && affected_version != null && labels != null && is_regression != null && severity != null && reproducibitlity != null && is_triaged != null && project != null && how_found != null && devices_affected != null){
        message += "All mandatory fields are added\n";
    }
    else{
        console.log("Some fields are missing \n");
    }
    message += "\n================="
    message += toUnicodeVariant("\nTotal Labels added: "+labels.length, "bold sans")+"\n";
    message += "=================\n"
    message += label_list

    if (label_found.includes("qs-direct")){
    message += "\n===========================================\n";
    message += toUnicodeVariant("Make sure Test Case Link is added.\n", "bold sans");
    message += toUnicodeVariant("Since QS-Direct label is added in this BUG.\n", "bold sans");
    message += "===========================================\n";
    }
    if (message){
        alert(message+"\n");
    }
}
//Jira_self_audit();
