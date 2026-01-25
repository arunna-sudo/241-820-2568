function submitData() {
   
    let fname = document.querySelector('input[name="firstname"]').value;
    let lname = document.querySelector('input[name="lastname"]').value;
    let age = document.querySelector('input[name="age"]').value;
    let desc = document.querySelector('textarea[name="description"]').value;

   
    let genderElement = document.querySelector('input[name="gender"]:checked');
    let gender = genderElement ? genderElement.value : "ไม่ได้ระบุ";


    let interests = [];
    let hobbyElements = document.querySelectorAll('input[name="interest"]:checked');
    hobbyElements.forEach((item) => {
        interests.push(item.value);
    });

    let userData = {
        firstname: fname,
        lastname: lname,
        age: age,
        gender: gender,
        interests: interests,  
        description: desc
    };


    console.log(userData);

    alert("บันทึกข้อมูลสำเร็จ! ลองกด F12 ดู Object ใน Console ได้เลย");
}