function createLink(val) {
    document.getElementById("userReflections").innerHTML = val;
    document.getElementById('submitRef').style.display = 'none';
    document.getElementById('text-area').style.display = 'none';

    localStorage.setItem("textArea", val);
}


