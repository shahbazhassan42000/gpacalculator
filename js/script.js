document.addEventListener("DOMContentLoaded", function () {
    let totalGPA = 0.0;
    let totalGrades = 0.0;
    let totalCredits = 0;
    let courseNo = 1;
    const addBtn = document.getElementById("add");
    const courseTable = document.getElementById("courses");
    const output = document.getElementById("output");
    const circle = document.getElementById("circle");
    const gpa = document.getElementById("gpa");
    /*** Add ANOTHER COURSE ***/
    addBtn.addEventListener("click", function (event) {

        event.preventDefault();
    });

    /*** Calculating GPA on selecting credit hours ***/
    courseTable.addEventListener("change", function (event) {
        let selected = event.target;
        if(selected.tagName==="SELECT"){
            if (selected.name === "credit") /*** Reset total grade or total credit hours ***/
            totalCredits = 0;
            else
                totalGrades = 0.0;
            /*** on changing any credit hour or grade recalculate total grades or credits ***/
            let list=document.getElementsByName(selected.name);
            for (let i = 0; i < courseTable.rows.length; i++) {
                if(list[i].value!==""){
                    if (selected.name === "credit")
                        totalCredits += (+list[i].value);
                    else//TODO
                        totalGrades += (+list[i].value);
                }
            }
            /*** recalculate gpa and show on screen ***/
            let rowIndex = selected.parentElement.parentElement.rowIndex;
            let credit = document.getElementsByName("credit")[rowIndex];
            if (selected.name === "credit" || (selected.name === "grade" && credit.value !== "")) {
                calculateGPA()
            }
        }
    });

    /*** recalculate gpa and show on screen ***/
    function calculateGPA() {
        totalCredits=totalCredits.toFixed(2);
        totalGrades=totalGrades.toFixed(2);
        totalGPA = totalGrades / totalCredits;
        totalGPA=totalGPA.toFixed(2);
        /*** displaying GPA ***/
        output.setAttribute("style","display:block");
        gpa.innerText = totalGPA.toString();
        if (totalGPA >= 3.33)
            circle.style.backgroundColor = "#199E6C";
        else if (totalGPA >= 2.30 && totalGPA < 3.33)
            circle.style.backgroundColor = "#b7b400";
        else
            circle.style.backgroundColor = "#B71919";
        console.log("CH: "+totalCredits.toString());
        console.log("Grades: "+totalGrades.toString());
    }
});