let egg = (function () {
    let timer = null;
    let run = null;
    let fn = null;

    function init(speed) {
        this.destory();
        let snake = [41, 40], //snake队列表示蛇身，初始节点存在但不显示
            direction = 1, //1表示向右，-1表示向左，20表示向下，-20表示向上
            food = 43, //食物的位置
            n, //与下次移动的位置有关
            box = document.getElementById('egg').getContext('2d');
        //从0到399表示box里[0~19]*[0~19]的所有节点，每20px一个节点

        function draw(seat, color) {
            box.fillStyle = color;
            box.fillRect(seat % 18 * 18 + 1, ~~(seat / 18) * 18 + 1, 16, 16);
            //用color填充一个矩形，以前两个参数为x，y坐标，后两个参数为宽和高。
        }

        document.onkeydown = function (evt) {
            //当键盘上下左右键摁下的时候改变direction
            direction = snake[1] - snake[0] == (n = [-1, -18, 1, 18][(evt || event).keyCode - 37] || direction) ? direction : n;
        };

        (function () {
            snake.unshift(n = snake[0] + direction);
            //此时的n为下次蛇头出现的位置，n进入队列
            if (snake.indexOf(n, 1) > 0 || n < 0 || n > 323 || direction == 1 && n % 18 == 0 || direction == -1 && n % 18 == 17) {
                //if语句判断贪吃蛇是否撞到自己或者墙壁，碰到时返回，结束程序
                return
                // alert("GAME OVER!");
            }
            draw(n, "#00d9ff"); //画出蛇头下次出现的位置
            if (n == food) { //如果吃到食物时，产生一个蛇身以外的随机的点，不会去掉蛇尾
                while (snake.indexOf(food = ~~(Math.random() * 324)) >= 0);
                draw(food, "#00ff6a");
            } else { //没有吃到食物时正常移动，蛇尾出队列
                draw(snake.pop(), "#535353");
            }

            run = function(fn){
                timer = setTimeout(fn, speed || 300);
            }
            
            run(arguments.callee);
            fn = arguments.callee
        })();

    }

    function destory() {
        let c = document.getElementById('egg');
        let cxt = c.getContext("2d");
        cxt.clearRect(0, 0, c.width, c.height);
        clearTimeout(timer)
    }

    function pause(){
        clearTimeout(timer)
    }

    function play(){
       run(fn);
    }

    return {
        destory: destory,
        init: init,
        pause:pause,
        play:play
    }

})();