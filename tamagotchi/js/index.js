$(document).ready(function() {
  let baseFood = 100;
  let baseHappy = 100;
  let baseWash = 100;
  let maxStatTamagotchi = 100;
  let time = 0;
  let difficulty = 3;
  let counter;
  let tamagotchi = {
    feed: baseFood,
    run: baseHappy,
    wash: baseWash,
    isDead: function() {
      if ((this.feed <=  -1) || (this.wash <= -1) || (this.run <= -1)) {
        return true;
      } else {
        return false;
      }
    }
  };

   $('#hardLevel_js').click(function() {
       $('#feedMeter').attr({max : 70});
       $('#washMeter').attr({max : 70});
       $('#runMeter').attr({max : 70});
       tamagotchi.feed = 40 + (Math.random() * 100 - 30);
       tamagotchi.run = 40 + (Math.random() * 100 - 30);
       tamagotchi.wash = 40 + (Math.random() * 100 - 30);
       counter = setInterval(timer, 300);
   });

   $('#easyLevel_js').click(function() {
       tamagotchi.feed = Math.random() * 100 + 50;
       tamagotchi.run = Math.random() * 100 + 50;
       tamagotchi.wash = Math.random() * 100 + 50;
       counter = setInterval(timer, 500);
   });

  $('#feed_js').click(feeding);
  function feeding () {
    tamagotchi.feed = tamagotchi.feed + 30;
    tamagotchi.wash = tamagotchi.wash - 20;
  }

  $('#wash_js').click(wash);
  function wash () {
    tamagotchi.wash = tamagotchi.wash + 40;
    tamagotchi.run = tamagotchi.run - 20;
  }

  $('#run_js').click(run);
  function run () {
    tamagotchi.run = tamagotchi.run + 15;
    tamagotchi.feed = tamagotchi.feed - 10;
  }

  $('#leaves_js').click(closeWindow);
  function closeWindow() {
    window.close();
  }

  $('#kill_js').click(killer);
  function killer() {
    tamagotchi.feed += -1000;
    tamagotchi.wash += -1000;
    tamagotchi.run += -1000;
  }

  function gameOver () {
    $('#gameStart_js').hide();
    $('#gameOver_js').show();
    $('#scream_js').get(0).play();
  }

  function timer() {

    tamagotchi.feed -= difficulty;
    tamagotchi.run -= difficulty;
    tamagotchi.wash -= difficulty;
    time += .500;

    if (tamagotchi.isDead()) {
      gameOver ();
      clearInterval(counter);
      $('#gameOverTime_js').append(`${time} seconds`);
      $('#restart_js').click(restart);

      function restart () {
        location.reload()
      }
    }

    if (tamagotchi.feed > maxStatTamagotchi) {
      tamagotchi.feed = maxStatTamagotchi;
    }

    if (tamagotchi.run > maxStatTamagotchi) {
      tamagotchi.run = maxStatTamagotchi;
    }

    if (tamagotchi.wash > maxStatTamagotchi) {
      tamagotchi.wash = maxStatTamagotchi;
    }

    $('.game-start__meter--food').empty(0).append(tamagotchi.feed.toFixed(0));
    $('#feedMeter').val(tamagotchi.feed);

    $('.game-start__meter--wash').empty(0).append(tamagotchi.wash.toFixed(0));
    $('#washMeter').val(tamagotchi.wash);

    $('.game-start__meter--run').empty(0).append(tamagotchi.run.toFixed(0));
    $('#runMeter').val(tamagotchi.run);
  }
});
