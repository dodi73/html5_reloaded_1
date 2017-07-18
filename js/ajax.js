/*
// 1. Példányosítunk egy új XMLHttpRequest-et (ez egy böngészőbe beépített API, objektum).
//Ezzel tudunk a szerver felé kérést intézni, úgy, hogy nem frissül az oldalunk.
var xhr = new XMLHttpRequest;


//2. Megadjuk a kérés típusát és a végpontot, ahova a kérés irányul.
xhr.open('get', 'json/user.json');


//3. Lekezeljük a választ, az onload eseménnyel, amikor kész a válasz.
xhr.onload = function(ev) {
    var users = JSON.parse(ev.target.response);
    console.log(users);
}


//4. Kérés küldése:
xhr.send();



// Ugyanez jQuery-vel:
$.ajax({
    url: 'json/user.json',
    dataType: 'json',
    success: function(response) {
        console.log(response);
    }
});
*/

//Ugyanez, még rövidebben, szintén jQusery-vel:
$.getJSON('json/user.json', function(users) {
    fillTable(users);
});

// Felhasználói adatok feldolgozása, felhasználók listája:
function fillTable(users) {
    
    var btnTemplate = '<button class="btn btn-success mod-btn" data-userid="?">Módosítás</button>';
    var keys = ['name', 'age', 'address', 'job'];
    
    var tBody = $('.ajax-table tbody');
    //Végigmegy a paraméterben kapott users felhasználók json objektumon:
    //
    for( var k in users ) {
        var id = 'user_'+(k+1);
        var tr = $('<tr />');
        tr.append( $('<td />').html(id) );
        for( var kk in keys ) {
            tr.append( $('<td data-name="'+keys[kk]+'" />')
                .html(users[k][keys[kk]]) );            
        }
        tr.append( 
            $('<td />')
                .append(btnTemplate.replace('?', id)) )
        .appendTo(tBody)
        .data('userData', users[k]);
    } 
    
    // Modásli ablak megnyitása a felhasználók szerkesztéséhez:
    // Megjelenítés klikkelésre, eseménykezeléssel, ahol a jQuery az összes olyan elemhez
    // hozzáadja az eseménykezelést, aminek .mod-btn az osztálya.
    // A this megadja, hogy éppen ezek közül melyik elemre kattintottak.
    // A modBtn()-egy saját jQuery függvény, ami lentebb van definiálva.
    tBody.find('.mod-btn').modBtn('ajaxModal');        

}


// Tábla frissítése:
function updateTable(tr, userData) {
    tr.find('td').each(function(key, td) {
        var k = $(td).data('name');
        $(td).html(userData[k]);
    });
}



// A módosítás gomb jQuery plugin-ja:
// Megírjuk a saját jQuery függvényünket:
$.fn.modBtn = function(modalId) {
    this.on('click', function() {
        
        var modalWindow = $('#'+modalId);
        var tr = $(this).parents('tr');
        var userData = tr.data('userData');
        
        modalWindow
            .find('input')
            .each(function(key, input){
                $(input)
                    .val(userData[input.name])
                    .off('change')
                    .on('change', function(){
                        userData[this.name] = this.value;
                    });
            });
        
        modalWindow
            .find('.mod-save-btn')
            .off('click')
            .on('click', function(){
                updateTable(tr, userData); 
                modalWindow.modal('hide'); 
            });
        
        modalWindow.modal('show'); 
        
    });
    // A visszatéréssel biztosítjuk a további láncolhatóságát a plugin-ünknek.
    return this;
};





