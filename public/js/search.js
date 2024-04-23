function checkData() {
    let formValue = document.getElementById('cityInput').value;

    if(formValue=="") {
        alert("Text area cannot be blank");
    } else {
        document.getElementById('f-searchCity').submit();
    }
}

document.getElementById('searchButton').addEventListener('click', checkData);