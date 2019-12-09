$(document).ready(function() {

  let baseFood = 100;
  let baseHappy = 100;
  let baseWash = 100;

  // let easy = 3;
  // let hard = 5;

  let time = 0;
  let difficulty = 3;
  let counter = setInterval(timer, 500);

  let tamagotchi = {
    'feed': baseFood,
    'run': baseHappy,
    'wash': baseWash,
    isDead: function() {
      if ((this.feed <= -1) || (this.wash <= -1) || (this.run <= -1)) {
        return true;
      } else {
        return false;
      }
    }
  };
  document.getElementById('leaves_js').addEventListener('click', closeWindow);

  // document.getElementById('easyLevel_js').addEventListener('click', gameStart(easy));
  // document.getElementById('hardLevel_js').addEventListener('click', gameStart(hard));

  document.getElementById('kill_js').addEventListener('click', killer);
  document.getElementById('feed_js').addEventListener('click', feeding);
  document.getElementById('wash_js').addEventListener('click', wash);
  document.getElementById('run_js').addEventListener('click', run);

  // function gameStart(level) {
  //   if (level === 5) {
  //     document.getElementById('feedMeter').max = 70;
  //     document.getElementById('washMeter').max = 70;
  //     document.getElementById('runMeter').max = 70;
  //     baseFood = 40 + (Math.random() * 100 - 30);
  //     baseHappy = 40 + (Math.random() * 100 - 30);
  //     baseWash = 40 + (Math.random() * 100 - 30);
  //
  //     // counter = setInterval(timer, 500);
  //   }
  //
  //   if (level === 3) {
  //     document.getElementById('feedMeter').max = 100;
  //     document.getElementById('washMeter').max = 100;
  //     document.getElementById('runMeter').max = 100;
  //     baseFood = Math.random() * 100 + 50;
  //     baseHappy = Math.random() * 100 + 50;
  //     baseWash = Math.random() * 100 + 50;
  //
  //     // counter = setInterval(timer, 500);
  //   }
  //
  //   return difficulty = level;
  // }

  function feeding () {
    tamagotchi.feed += 30;
    tamagotchi.wash += -20;
  }

  function wash () {
    tamagotchi.wash += 40;
    tamagotchi.run += -20;
  }

  function run () {
    tamagotchi.run += 15;
    tamagotchi.feed += -10;
  }

  function closeWindow() {
    window.close();
  }

  function killer() {
    tamagotchi.feed += -1000;
    tamagotchi.wash += -1000;
    tamagotchi.run += -1000;
  }

  function gameOver () {
    document.getElementById('gameStart_js').style.display = 'none';
    document.getElementById('gameOver_js').style.display = 'block';
    document.getElementById('scream_js').play();
  }

  function timer() {

    tamagotchi.feed -= difficulty;
    tamagotchi.run -= difficulty;
    tamagotchi.wash -= difficulty;
    time += .500;

    if (tamagotchi.isDead() === true) {
      gameOver ();
      clearInterval(counter);
      document.getElementById('gameOverTime_js').innerText = `${time} seconds`;
      document.getElementById('restart_js').addEventListener('click', restart);

      function restart () {
        location.reload()
      }
    }

    if (tamagotchi.feed > 100) {
      tamagotchi.feed = 100;
    }

    if (tamagotchi.run > 100) {
      tamagotchi.run = 100;
    }

    if (tamagotchi.wash > 100) {
      tamagotchi.wash = 100;
    }

    $('.game-start__meter--food').empty(0).append(tamagotchi.feed.toFixed(0));
    document.getElementById('feedMeter').value = tamagotchi.feed;

    $('.game-start__meter--wash').empty(0).append(tamagotchi.wash.toFixed(0));
    document.getElementById('washMeter').value = tamagotchi.wash;

    $('.game-start__meter--run').empty(0).append(tamagotchi.run.toFixed(0));
    document.getElementById('runMeter').value = tamagotchi.run;
  }
});
