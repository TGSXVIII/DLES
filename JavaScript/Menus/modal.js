document.addEventListener('DOMContentLoaded', (event) => 
{
    // Get the modal elements
    var modalSignUp = document.getElementById("myModalSignUp");
    var modalLogin = document.getElementById("myModalLogin");

    // Get the button elements that open the modals
    var btnSignUp = document.getElementById("myBtnSignUp");
    var btnLogin = document.getElementById("myBtnLogin");

    // Get the <span> elements that close the modals
    var spanSignUp = document.getElementById("closeSignUp");
    var spanLogin = document.getElementById("closeLogin");

    // When the user clicks the button, open the modal
    btnSignUp.onclick = function () 
    {
        modalSignUp.style.display = "block";
    }

    btnLogin.onclick = function () 
    {
        modalLogin.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    spanSignUp.onclick = function () 
    {
        modalSignUp.style.display = "none";
    }

    spanLogin.onclick = function () 
    {
        modalLogin.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event)
    {
        if (event.target == modalSignUp) 
        {
            modalSignUp.style.display = "none";
        }
        
        if (event.target == modalLogin) 
        {
            modalLogin.style.display = "none";
        }
    }
});
