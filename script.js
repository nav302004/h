$(document).ready(function () {

    // Number of days calcuation vairable to acces all over th code
    let numberofday = 0

    // for collection of obejct to be shown  
    let dataEntry = []

    // Exclude date variable to access all over the below code 
    let excludedates = []

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
        const date = new Date()
        $(".startdate").attr("value", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)

        // $(".addexcludedate").click()
    })

    // Overlay Date input cretria

    $(".startdate").change(() => {

        // setting minium end date cretria
        // console.log($(".startdate").val())
        const enddateminium = $(".startdate").val()
        const enddate = new Date(enddateminium)
        $(".enddate").attr("min", `${enddate.getFullYear()}-${enddate.getMonth() + 1}-${enddate.getDate() + 1}`)
        $(".excludedate").attr({
            "min": `${enddate.getFullYear()}-${enddate.getMonth() + 1}-${enddate.getDate()}`

        })
        numberofdays()
    })
    $(".enddate").change(() => {
        // console.log($(".enddate").val())
        const enddateminium = $(".enddate").val()
        const enddate = new Date(enddateminium)
        $(".enddate").attr("min", `${enddate.getFullYear()}-${enddate.getMonth() + 1}-${enddate.getDate() + 1}`)
        $(".excludedate").attr({
            "max": `${enddate.getFullYear()}-${enddate.getMonth() + 1}-${enddate.getDate()}`
        })
        numberofdays()
    })

    // exclude date logic
    $(".addexcludedate").click(() => {
        if ($(".excludedate").val().trim() != "" && excludedates.indexOf($(".excludedate").val()) == -1) {
            // console.log(excludedates.indexOf($(".excludedate").val()) )
            excludedates.push($(".excludedate").val())
        }
        let excludedateHTML = "";
        const excludedateconatiner = excludedates.map((date) => {
            if (excludedateHTML.includes(date)) {
                return;
            }
            excludedateHTML = excludedateHTML + `<small class="excludedateitem" ><img src="./assests/minus-solid.svg">${date}</small>`
            return `<small>${date}</small>`
        })
        $(".excludeddateshow").html(excludedateHTML);
        numberofdays()
    })
    $(".excludeddateshow").on("click", ".excludedateitem", function (e) {
        // console.log("clicked")
        // console.log(e.target.innerHTML.replace('<img src="./assests/minus-circle.svg">',""))
        // let newexcludedate = excludedates.filter((date) => date != e.target.innerHTML.replace('<img src="./assests/minus-circle.svg">',""))
        $(this).remove()
        // console.log(newexcludedate)
        excludedates.pop(e.target.innerHTML.replace('<img src="./assests/minus-circle.svg">', ""))
        // excludedates = newexcludedate
        numberofdays()
    })
    // setInterval(() => {
    //     console.log(excludedates)
    // }, 1000);

    // functio of number of dates because we need exculde date variable 
    function numberofdays() {
        let date1 = new Date($(".startdate").val())
        let date2 = new Date($(".enddate").val())
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        numberofday = (diffDays + 1) - excludedates.length
        // console.log(numberofday)
        $(".numberofdays").text(`Number of Days : ${numberofday}`)
    }


    // table logic here 

    $(".newentry").click(() => {
        let date = new Date()
        let newdataentry = {
            startdate: $(".startdate").val(),
            enddate: $(".enddate").val(),
            excludedate: excludedates,
            numberofday: numberofday,
            leadcount: $(".leadcounter").val(),
            lastUpdated: {
                date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                time: `${date.getHours()}:${date.getMinutes()}`
            },
            monthyear: $(".startdate").val().slice(0, 7).replace("-", ","),
        }
        // console.log(newdataentry)
        $(".overlay").hide();

        dataEntry.unshift(newdataentry)

        let dataentryHTML = "";

        let id = dataEntry.length
        const dataentryconatiner = dataEntry.map((entry) => {
            // console.log("Inside the function ")
            dataentryHTML = dataentryHTML + `
            <tr>
                <td class="sticky_prop">${id--}</td>
            <td>-</td>
            <td>${entry.startdate ? entry.startdate : "-"}</td>
            <td>${entry.enddate ? entry.enddate : "-"}</td>
            <td>${entry.monthyear ? entry.monthyear : "-"}</td>
            <td>${entry.excludedate.map(excl => `${excl} `)}</td >
            <td>${entry.numberofday ? entry.numberofday : "-"}</td>
            <td>${entry.leadcount ? entry.leadcount : "-"}</td>
            <td>${Math.round(entry.leadcount / entry.numberofday)}</td>
            <td>${entry.lastUpdated.date ? entry.lastUpdated.date : "-"} <br /> ${entry.lastUpdated.time ? entry.lastUpdated.time : "-"}</td>
            <td><button class="bn17">Delete</button></td>
                </tr >
                `
            return `< small > ${date}</ > `
        })
        $(".tablebody").html(dataentryHTML);
        // console.warn(excludedates)
        $(".startdate").attr("value", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        // $(".enddate").attr("value", "")
        excludedates = []
        // $(".excludedate").attr({
        //     value: null,
        // })

        // set all the value back to null and begging 
        let none = $(".enddate").val('')
        none = $(".excludedate").val('')
        none = $(".leadcounter").val('')
        $(".excludeddateshow").html('');

    })

    // remove a table entry 
    $(".tablebody").on("click", ".bn17", function (e) {
        $(this.parentElement.parentElement).remove()
        console.log(e.target.parentElement.previousSibling.previousSibling.innerHTML)
        let elementdatetime = e.target.parentElement.previousSibling.previousSibling.innerHTML
        let datetime = elementdatetime.replace(" <br>","")
        let removeitem = dataEntry.filter((ele) => {
            let comp = `${ele.lastUpdated.date} ${ele.lastUpdated.time}`
            console.log(datetime)
            return datetime == comp
        })
        console.error(removeitem)
        dataEntry.pop(removeitem)
        console.log(dataEntry)
    })
})