"use strict";
$(document).ready(function () {
    let isPause = true;
    let seconds = 0;
    let countStarts = 0;
    setInterval(timer, 1000);

    $("#start").click(
        function () {
            if ($(this).html() === "PAUSE") {
                $(this).html("START");
                isPause = false;
                showBlockWindow();
            }
            else {
                $(this).html("PAUSE");
                $("#pause").html("PAUSE");
                isPause = true;
                countStarts++;
                hideBlockWindow();
                if (countStarts === 1) {
                    $("#reset").prop('disabled', false);
                    randomisePlayground();
                }
            }
        }
    );

    $("#reset").click(function () {
        seconds = 0;
        randomisePlayground();
        $("#moves").html("0");
        $("#time").html("00:00");
    });

    function timer() {
        if (isPause && countStarts > 0) {
            let minutes = parseInt(seconds / 60);
            let currentSeconds = seconds % 60;
            seconds++;

            $("#time").html(minutes < 10 ? "0" + minutes + ":" + (currentSeconds < 10 ? "0" + currentSeconds : currentSeconds)
                : minutes + ":" + (currentSeconds < 10 ? "0" + currentSeconds : currentSeconds));
        }
    };

    function randomisePlayground() {
        let arrPlayValue = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", ""];
        let arrBlocks = document.querySelectorAll("th");
        let width = 90, curItem;
        for (let i = 0; i < arrBlocks.length; i++) {
            arrBlocks[i].innerText = arrPlayValue[curItem = Math.floor(Math.random() * arrPlayValue.length)];
            arrBlocks[i].width = width + "px";
            arrPlayValue.splice(curItem, 1);
        }
    }

    function showBlockWindow() {
        $("#block").css({ display: "inline-block" });
    }

    function hideBlockWindow() {
        $("#block").css({ display: "none" });
    }

    $(function startConfig() {
        $("#block").css({
            width: $("#gameFild").css("width"),
            height: $("#gameFild").css("height"),
            opacity: "0.6"
        });
        $("#reset").prop('disabled', true);
    })

    $(window).resize(function () {
        $("#block").css({
            width: $("#gameFild").css("width"),
            height: $("#gameFild").css("height")
        });
    });

    $("th").click(function () {
        if ($(this).html() === "" || countStarts === 0)
            return;

        if ($(this).next().html() === "") {
            changeBlock($(this), $(this).next());
        }
        else if ($(this).prev().html() === "") {
            changeBlock($(this), $(this).prev());
        }
        else if ($("#" + (parseInt($(this).prop('id')) - 4)).html() === "") {
            changeBlock($(this), $("#" + (parseInt($(this).prop('id')) - 4)));
        }
        else if ($("#" + (parseInt($(this).prop('id')) + 4)).html() === "") {
            changeBlock($(this), $("#" + (parseInt($(this).prop('id')) + 4)));
        }
    });

    function changeBlock(item1, item2) {
        let temp = item1.html();
        item1.html(item2.html());
        item2.html(temp);
        $("#moves").html((parseInt($("#moves").html()) + 1));
        if (checkWin()) {
            $("#start").click();
            $("#pause").html("VICTORY!!!");
        }
    }

    function checkWin() {
        let arrBlocks = document.querySelectorAll("th");
        let arrValue = [];
        for (let i = 0; i < arrBlocks.length; i++) {
            arrValue.push(arrBlocks[i].innerText);
        }
        return JSON.stringify(arrValue) === JSON.stringify(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", ""]);
    }
    //keyboard
    //$(window).keydown(function (event) {
    //    if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
    //        event.preventDefault();
    //    }
    //    let emptyItem = ;
    //    switch (event.keyCode) {
    //        case 37:
    //            break;
    //        case 38:
    //            break;
    //        case 39:
    //            break;
    //        case 40:
    //            break;
    //        default: break;
    //    }
    //});

    //function findEmpty() {
    //    let temp = d
    //}
});