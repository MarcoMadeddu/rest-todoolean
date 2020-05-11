$(document).ready(function(){
    
// V A R I A B I L I //
    var list= $(".todo");
    var input =$(".add-element");
    var remove =$(".remove");
    var show=$(".show");

    var source = $("#todo-template").html();
    var template = Handlebars.compile(source);

    var apiUrl = "http://157.230.17.132:3011/todos";

    input.keypress(function(e){
        if(e.which==13){
            run(apiUrl,input,list,template,show);
        }
    });

    $(document).on('click', '.remove', function () {

        removeItem( $(this).data("id"),list,template,apiUrl);
        console.log($(this).data("id"));

    });

});

//**F U N C T I O N S**/

// R  U N //
function run(apiUrl,input,list,template){
    var value = input.val().trim();

    $.ajax({
        url: apiUrl,
        method: "POST",
        data:{
            text: value
        },
        success: function(){
            printAll(list,template,apiUrl);
            input.val("");
        },
        error: function(){
            console.log("errore chiamata api");
            
        }
    })  
}

// P R I N T  A L L //
function printAll(list,template,apiUrl){
    list.children().remove();
    $.ajax({
        url: apiUrl,
        method: "GET",
        
        success: function(data){
            for(var i =0; i <data.length; i++){
                var value={
                    text: data[i].text,
                    id: data[i].id
                }
                var set = template(value);
                list.append(set);
            } 
        },
        error: function(){
            console.log("errore chiamata api");
            
        }
    })
}

// R E M O V E  I T E M //
function removeItem(string ,list,template,apiUrl){
    $.ajax({
        url: apiUrl + "/" + string,
        method: "DELETE",
        success: function(){
            printAll(list,template,apiUrl);
        },
        error: function(){
            console.log("errore cancellamento");
            
        }
    })
}
