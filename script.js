$(document).ready(function () {

    // Overlay show logic here 

    // Initial level the overlay will be hide 
    $(".overlay").hide();

    // Chnaging the overlay setting 

    // when cancel button tap
    $(".cancel").click(() => {
        $(".overlay").hide();
    })

    // when add new button tap 
    $(".addnewentry").click(() => {
        $(".overlay").show();
        const date = new Date();
        $(".startdate").attr("value", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`)
        $(".enddate").attr("value", "")
    })

    // Overlay Date input cretria

    $(".startdate").change(() => {

        // setting minium end date cretria
        console.log($(".startdate").val())
        const enddateminium = $(".startdate").val()
        const enddate = new Date(enddateminium)
        $(".enddate").attr("min", `${enddate.getFullYear()}-${enddate.getMonth() + 1}-${enddate.getDate() + 1}`)
        $(".excludedate").attr({
            "min": `${enddate.getFullYear()}-${enddate.getMonth() + 1}-${enddate.getDate()}`

        })
    })
    $(".enddate").change(() => {
        console.log($(".enddate").val())
        const enddateminium = $(".enddate").val()
        const enddate = new Date(enddateminium)
        $(".enddate").attr("min", `${enddate.getFullYear()}-${enddate.getMonth() + 1}-${enddate.getDate() + 1}`)
        $(".excludedate").attr({
            "max": `${enddate.getFullYear()}-${enddate.getMonth() + 1}-${enddate.getDate()}`
        })
    })

    // exclude date logic
    let excludedates = []
    let excludedateHTML = "";
    $(".addexcludedate").click(() => {
        if ($(".excludedate").val().trim() != "") {
            excludedates.push($(".excludedate").val())
        }
        const excludedateconatiner = excludedates.map((date) => {
            if (excludedateHTML.includes(date)) {
                return;
            }
            excludedateHTML = excludedateHTML + `<small class="excludedateitem" ><img src="./assests/minus-circle.svg">${date}</small>`
            console.log(excludedateHTML)
            return `<small>${date}</small>`
        })
        $(".excludeddateshow").html(excludedateHTML);
    })
    $(".excludeddateshow").on("click",".excludedateitem",() => {
        console.log("clicked")
    })


})