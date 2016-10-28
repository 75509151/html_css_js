
function RoboCmdLogWidget($w, parent) {
    this.base = BaseWidget;
    this.base.call(this, $w, parent);
    var self = this;
    
    this.reset_data = function(data){

        var log = self.$obj.find(".log").eq(0);
        var content=log.val();
        content = content+data['log']+"\n";
        log.val(content);

    };
}



function robo_cmd_del(obj){
        var li = document.getElementById(obj);
        var ul = li.parentNode;
        ul.removeChild(li);
    }
function robo_cmd_go(id){
    var ele = document.getElementById(id);
    var sqline = {}
    sqline["wid"] = "R1sAdminRoboCmdForm";
    sqline["cid"] = "board_warp";
    sqline["type"] = "EVENT";
    sqline["EVENT"] = "EVENT_MOUSE_CLICK";
    sqline["param_info"] =  {"cmd":ele.content};
    sq.qlist.push(sqline);
    sq.send();
}
function robo_cmd_add(obj, prefix){
    var board = obj.parentNode;
    var cmd_list = board.getElementsByClassName("cmd_list")[0];
    var inp = board.getElementsByClassName("cmd")[0];
    if (inp.value!="")
    {
        var li = document.createElement('li');
        li.id = inp.value;
        li.content= prefix + " " + inp.value ;
        li.innerHTML = li.content + "<a class='robo_cmd_del' href='javascript:robo_cmd_del(\""+inp.value+"\");'>del</a>" +"<a class='robo_cmd_go' href='javascript:robo_cmd_go(\""+inp.value+"\");'>go</a>";
        // li.innerHTML = li.content + "<a href='javascript:robo_cmd_del(\""+inp.value+"\");'>robo_cmd_del</a>" +"<input type='button' wtype='RoboCmdButtonWidget' class='widget btn' value='robo_cmd_go'></input>";
        cmd_list.appendChild(li);
    }
}

function clear_log(obj){
    var father = obj.parentNode;
    var log_widget = father.getElementsByClassName("log")[0];
    log_widget.value="";

}


function RoboCmdWidget($w, parent){
    this.base = BaseWidget;
    this.base.call(this, $w, parent);
    var self = this;

    this.reset_data = function(data){
        // var board = document.getElementById(data['board']);
        var cmd_list = $(this.$obj).find(".cmd_list")[0];
        if (data['cmd'] != '')
        {
            var li = document.createElement('li');
            if (document.getElementById(data['cmd']) == undefined)
            {
                li.id = data['cmd'];
                li.content= data['cmd'];
                li.innerHTML = data['cmd'] + "<a class='robo_cmd_del' href='javascript:robo_cmd_del(\""+data['cmd']+"\");'>del</a>" +"<a class='robo_cmd_go' href='javascript:robo_cmd_go(\""+data['cmd']+"\");'>go</a>";
                // li.innerHTML = li.content + "<a href='javascript:robo_cmd_del(\""+inp.value+"\");'>robo_cmd_del</a>" +"<input type='button' wtype='RoboCmdButtonWidget' class='widget btn' value='robo_cmd_go'></input>";
                cmd_list.appendChild(li);
            }
            
        }

    };
}

var before_id = 'xy_board';

function show_board(id)
{
    var show_board = document.getElementById(id);
    show_board.className = "widget board selec";


    if (before_id!=id)
    {
        var hide_board = document.getElementById(before_id);
        hide_board.className = "widget board hide";
    }
    before_id = id;
}

var shift = false,
    capslock = false,
    robo_cmd_keyboard_bind_click = false;


function show_keyboard()
{
    document.getElementById('keyboard').style.display="block";
    if (robo_cmd_keyboard_bind_click == false)
    {
        robo_cmd_keyboard_bind_click = true;
        // Download by http://www.codefans.net
    $('#keyboard li').click(function(){
        var $write = $('div.selec').find('.cmd')[0];
        var $this = $(this),
            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
        
        if ('return' == character)
        {
            $("#keyboard").css("display","none");   
        }
        // Shift keys
        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
            $('.letter').toggleClass('uppercase');
            $('.symbol span').toggle();
            
            shift = (shift === true) ? false : true;
            capslock = false;
            return false;
        }
        
        // Caps lock
        if ($this.hasClass('capslock')) {
            $('.letter').toggleClass('uppercase');
            capslock = true;
            return false;
        }
        
        // Delete
        if ($this.hasClass('delete')) {
            var html = $write.value;
            
            $write.value = html.substr(0, html.length - 1);
            return false;
        }
        
        // Special characters
        if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) character = "\t";
        if ($this.hasClass('return')) character = "\n";
        
        // Uppercase letter
        if ($this.hasClass('uppercase')) character = character.toUpperCase();
        
        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.symbol span').toggle();
            if (capslock === false) $('.letter').toggleClass('uppercase');
            
            shift = false;
        }
        
        // Add the character
        $write.value += character;

    });
    }
}


    