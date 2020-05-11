$(document).ready(function(){
    
// V A R I A B I L I //
    var list= $(".todo");
    var input =$(".add-element");
    var remove =$(".remove");

    var source = $("#todo-template").html();
    var template = Handlebars.compile(source);

    var apiUrl = "http://157.230.17.132:3011/todos"
    input.keypress(function(e){
        if(e.which==13){
            
            
            
        }
    });
});
