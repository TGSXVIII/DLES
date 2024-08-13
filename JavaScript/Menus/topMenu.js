function alternativeTopMenu() 
{
    var topMenu = document.getElementById('topmenu');
    var header = document.getElementById('header');

    if (topMenu.style.top === '-100px') 
    {
        topMenu.style.top = '0';
        header.style.marginTop = '100px';
    }

    else 
    {
        topMenu.style.top = '-100px';
        header.style.marginTop = '0';
    }
}