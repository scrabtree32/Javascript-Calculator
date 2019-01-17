$(document).ready(function() {
  var inputs = [""],
      fullString;
  const operators = ["+", "-", "/", "*"],
        operName = ["plus", "min", "div", "mult"],
        decimal = ["."],
        nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        zero = ['0'];
 
  
  //UPDATE WORK
  function update() {
    fullString = inputs.join("").replace(/(\-{2})/g, "+");
    $(".work").html(fullString);
  }
  
  //NUMBERS, is it better to have lastOper in each function seperately??
  $('.' + zero).click(function() {
    let lastOper = operators.map(i => inputs.lastIndexOf(i)).reduce((v, w) => v > w ? v: w);
    if(!inputs.includes("=") && fullString != '0' &&
      inputs[lastOper + 1] != '0') {
       inputs.push("0");
    }
    update();
  });

  $('.1, .2, .3, .4, .5, .6, .7, .8, .9').click(function() {
    if (!inputs.includes("=")) {
      inputs.push($(this).text());
      update();
    }
  });
 
  
  //OPERATORS
    $(".plus, .min, .div, .mult").click(function() {
      let lastInd = inputs[inputs.length - 1];
      //if = present, slice after = sign and push operator
      if (inputs.includes("=")) {
        inputs = inputs.slice(inputs.indexOf("=") + 1);
        inputs.push($(this).text());
        update();
      //if last element in input is num or zero, push operator
      } else if (nums.includes(lastInd) || 
        zero.includes(lastInd)) {
        inputs.push($(this).text());
        update();
      }
    });  
 
  //DECIMAL
  $(".dec").click(function() {
    //last index where operator was added
    let lastOper = operators.map(i => inputs.lastIndexOf(i)).reduce((v, w) => v > w ? v: w),
        lastInd = inputs[inputs.length - 1];
    if (lastOper < 0) {
      lastOper = 0;
    }
    //if equals sign included, start new
    if (inputs.includes('=')) {
      inputs = ['0', '.'];
      $(".total").html("0");
    }
    //if last ind not a number, zero or decimal
    else if (!nums.includes(lastInd) && !zero.includes(lastInd) 
        && lastInd != ".") {
      inputs.push("0", ".");
    //if input after lastOper does not include decimal
    } else if (!inputs.slice(lastOper).includes('.')) {
      inputs.push(".");
    }
    update();
  });
  
  //PLUS/MIN
  $('.negate').click(function() {
    let lastOper = operators.map(i => inputs.lastIndexOf(i)).reduce((v, w) => v > w ? v: w);
    //if has = sign add/remove - from total
    if (inputs.includes("=") && (inputs[inputs.indexOf('=') + 1] != '-')) { 
        inputs.splice(inputs.indexOf("=") + 1, 0, '-');
      }
    else if (inputs.includes('=') && (inputs[inputs.indexOf('=') + 1] == '-')) {
        inputs.splice(inputs.indexOf('=') + 1, 1);
    }
    //only one number, negate it
    else if (lastOper == 0 && inputs[0] == "-") inputs.splice(0, 1, "+"); 
    else if (lastOper == 0 && inputs[0] == "+") inputs.splice(0, 1, "-"); 
    //if there is no current operator, negate number
    else if (lastOper == -1) inputs.unshift('-'); 
    //negate last number in equation
    else if (lastOper > 0 && (lastOper != inputs.length - 2)) {
      if(!operators.includes(inputs[lastOper - 1])) inputs.splice(lastOper + 1, 0, "-");
      else inputs.splice(lastOper, 1);
    }
    update();
  });
  
  //GET TOTAL
   function getTotal() {
    var answer = eval(fullString);
    if (isFinite(answer)) {
    $(".total").html(answer);
    inputs.push("=");
    if(answer >= 0) inputs.push(answer)
    else inputs.push('-', Math.abs(answer));
    } else {
      $('.total').html('Cannot divide by 0!')
    }
    update();
  } 
  
  $(".enter").click(function() {
    getTotal();
  });
  
  
//PARTIAL CLEAR
  $(".clear").click(function() {
    if (nums.includes(inputs[inputs.length - 1]) || 
        decimal.includes(inputs[inputs.length -1])) {
      while (nums.includes(inputs[inputs.length - 1]) || 
             decimal.includes(inputs[inputs.length -1])) {
        inputs.pop();
      };
    } else if (operators.includes(inputs[inputs.length - 1]) || 
               operators.includes(inputs[inputs.length - 1])) {
      inputs.pop();       
    };
    update ();
  });
  
  //ALL CLEAR
  $(".allClear").click(function() {
    inputs = [""];
    update ();
    $(".total").html("0");
  });
});
