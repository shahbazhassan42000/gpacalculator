document.addEventListener("DOMContentLoaded", function () {
    let totalGPA = 0.0;
    let totalGrades = 0.0;
    let totalCredits = 0;
    let courseNo = 1;
    const addBtn = document.getElementById("add");
    const courseTable = document.getElementById("courses");
    const title = document.getElementById("main-title");
    const tableBody = courseTable.firstElementChild;
    const courseName = document.getElementsByClassName("course")[0];
    const grade = document.getElementsByClassName("labels")[0];
    const gradeList = document.getElementsByName("grade")[0];
    const credit = document.getElementsByClassName("labels")[1];
    const creditList = document.getElementsByName("credit")[0];
    const output = document.getElementById("output");
    const circle = document.getElementById("circle");
    const gpa = document.getElementById("gpa");

    /*** Add ANOTHER COURSE ***/
    addBtn.addEventListener("click", function (event) {
        if(courseNo>=7){
            alert("ERROR!!! Maximum courses per semester reached");
        }else{
            let tr=document.createElement("TR");
            let td1=document.createElement("TD");
            let td2=document.createElement("TD");
            td2.setAttribute("class","col2");
            let td3=document.createElement("TD");
            td3.setAttribute("class","col3");
            let td4=document.createElement("TD");
            td4.setAttribute("class","col4");
            let td5=document.createElement("TD");
            td5.setAttribute("class","col5");
            let td6=document.createElement("TD");

            courseNo++; /*** incrementing table rows ***/
            if(courseNo===7)
                title.setAttribute("style","margin:6px auto");

            /*** adding course name ***/
            let cn=courseName.cloneNode(true);
            cn.placeholder="e.g. Course "+courseNo.toString();
            cn.value="";
            td1.appendChild(cn);
            tr.appendChild(td1);

            /*** adding grade ***/
            td2.appendChild(grade.cloneNode(true));
            tr.appendChild(td2);

            /*** adding grade List ***/
            td3.appendChild(gradeList.cloneNode(true));
            tr.appendChild(td3);

            /*** adding credit ***/
            td4.appendChild(credit.cloneNode(true));
            tr.appendChild(td4);

            /*** adding credit list ***/
            td5.appendChild(creditList.cloneNode(true));
            tr.appendChild(td5);

            /*** creating and then adding remove course button ***/
            td6.setAttribute("class","removeBtn");
            td6.innerHTML="X";
            tr.appendChild(td6);

            tableBody.appendChild(tr);
        }
        event.preventDefault();
    });

    /*** REMOVE COURSE FROM TABLE ***/
    courseTable.addEventListener("click",function (event) {
        let btn = event.target;
        if(btn.classList.contains("removeBtn")){
            if(courseNo>1){
                btn.parentElement.remove();
                if(courseNo===7)
                    title.setAttribute("style","margin:28px auto");
                courseNo--;

                /*** on removing any row recalculate total grades or credits ***/
                totalCredits = 0;
                totalGrades = 0.0;
                let credits=document.getElementsByName("credit");
                let grades=document.getElementsByName("grade");
                for (let i = 0; i < courseTable.rows.length; i++) {
                    if(credits[i].value!==""){
                        totalCredits += (+credits[i].value);
                        totalGrades += ((+credits[i].value) * (+grades[i].value));
                    }
                }
                /*** recalculate gpa and show on screen ***/
                if((+totalCredits.toFixed(2))===0.0)
                    output.setAttribute("style","display:none");
                else
                    calculateGPA()
            }
        }
    });

    /*** Calculating GPA on selecting credit hours ***/
    courseTable.addEventListener("change", function (event) {
        let selected = event.target;
        if(selected.tagName==="SELECT"){
            if (selected.name === "credit") /*** Reset total grade or total credit hours ***/
                totalCredits = 0;
            totalGrades = 0.0;
            /*** on changing any credit hour or grade recalculate total grades or credits ***/
            let list=document.getElementsByName(selected.name);
            for (let i = 0; i < courseTable.rows.length; i++) {
                if(list[i].value!==""){
                    if (selected.name === "credit")
                        totalCredits += (+list[i].value);
                    let change;
                    if(selected.name==="credit")
                        change=document.getElementsByName("grade");
                    else
                        change=document.getElementsByName("credit");
                    totalGrades += ((+list[i].value) * (+change[i].value));
                }
            }
            /*** recalculate gpa and show on screen ***/
            let rowIndex = selected.parentElement.parentElement.rowIndex;
            let credit = document.getElementsByName("credit")[rowIndex];
            if (selected.name === "credit" || (selected.name === "grade" && credit.value !== "")) {
                if((+totalCredits.toFixed(2))===0.0)
                    output.setAttribute("style","display:none");
                else
                    calculateGPA()
            }
        }
    });

    /*** recalculate gpa and show on screen ***/
    function calculateGPA() {
        totalCredits=(+totalCredits.toFixed(2));
        totalGrades=(+totalGrades.toFixed(2));
        totalGPA = totalGrades / totalCredits;
        totalGPA=(+totalGPA.toFixed(2));
        /*** displaying GPA ***/
        output.setAttribute("style","display:block");
        gpa.innerText = totalGPA.toString();
        if (totalGPA >= 3.33)
            circle.style.backgroundColor = "#199E6C";
        else if (totalGPA >= 2.30 && totalGPA < 3.33)
            circle.style.backgroundColor = "#b7b400";
        else
            circle.style.backgroundColor = "#B71919";
        console.log("CH: "+totalCredits.toFixed(2));
        console.log("Grades: "+totalGrades.toFixed(2));
    }
});