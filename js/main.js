'use strict'
{
  $(".battle-screen").hide();
  $(".choice-screen").hide();
  $(".start-screen").show();
  $(".item-list").hide();
  $(".item-list-change").hide();
  $(".item-list-kaifuku").hide();
  

  $(".start").on('click', function () {
    // $(".mask1").addClass("mask1-animetion2");
    // $(".mask2").addClass("mask2-animetion2").on('animationend', function () {
    // });
    $(".mask1").removeClass("mask1-animetion2");
    $(".mask2").removeClass("mask2-animetion2");
    $(".start-screen").hide();
    $(".choice-screen").show();
    $(".choice-mask").addClass("choice-mask-active");
    $("#message1-choice").t('このゲームはポ〇モンバトル風じゃんけんゲームです。<br>じゃんけんにかてば相手にダメージをあたえることができ、<br>まければダメージをうけます。てきは３体です。<br>すべてのてきをたおしたらかちです<br>手持ちのモンスターがぜんめつしたらまけとなります。', {
      caret: false, speed: 50,
    });
  });
  
  $("#message1-choice").one('click', function () {
    $(".choice-mask").removeClass("choice-mask-active");
    $("#message1-choice").t('さいしょのモンスターをえらんでください<br>hp: 体力　gu: ク”ーのつよさ<br>ch: チョキのつよさ　pa: パーのつよさ<br>キャラクターによってじゃんけんの出せるてかずがちがいます<br>hpやpp(じゃんけんのてかず)がへったらアイテムを使用したりこうたいを使いましょう', {
      caret: false, speed: 50,
    });
  });

  function choiceclick() {
    $(".choice-screen").hide();
    $(".choice-mask").hide();
    $(".start-screen").show();
    $(".mask1").addClass("mask1-animetion")
    $(".mask2").addClass("mask2-animetion").on('animationend', function () {
      $(".battle-screen").show();
      $(".start-screen").hide();
    });
  }

  $(".fushigi").one('click', function () {
    choiceclick();
    characterchoice[0] = charatypecolumn[0];
    status();
    // console.log(characterchoice[0].papower);
  });
  $(".hito").one('click', function () {
    choiceclick();
    characterchoice[0] = charatypecolumn[1];
    status();
  });
  $(".zeni").one('click', function () {
    choiceclick();
    characterchoice[0] = charatypecolumn[2];
    // console.log(characterchoice[0].name);
    // console.log(charatypecolumn[2].name);
    status();
  });


  let hp;
  let power = 0;
  let attacType;
  let enemyAttac;
  let gupp;
  let maxgupp;
  let guppE;
  let chpp;
  let maxchpp;
  let chppE;
  let papp;
  let maxpapp;
  let pappE;
  let damege;
  let damegeE;

  //最初の処理
  window.onload = function () {

    $(".enemyHp-container, .hp-container, .attac-list1, .attac-list2").hide();
    $(".alliesimg").addClass("slide-in2");
    $(".enemyimg").addClass("slide-in1");

    $('.slide-in1, .slide-in2').one('animationend', function () {
      //アニメーションが終了したら下記を処理
      $(".enemyHp-container, .hp-container").show();
      $(".alliesimg").removeClass('slide-in2');
      $(".enemyimg").removeClass('slide-in1');
      $("#message1").t('あ、てきのモンスターがでてきた！', {
        caret: false, speed: 50,
      });
      // アニメーションが終了するまで押せないようにしておく
      // アニメーション後body内をクリックするとリストが開く
      $("body").one('click', function () {
        $("#message1,.message2").hide();
        $(".attac-list1").show();
        $(".attac-list2").show();
      });
    });
  };

  let characterchoice = [];
  let charatypecolumn = [
    { name: "フシギダ〇", gupower: 20, chpower: 20, papower: 40, img: "img/fushigi.png", hp: 120, maxhp: 120, gupp: 5, chpp: 4, papp: 3, maxgupp: 5, maxchpp: 4, maxpapp: 3 },
    { name: "ヒト〇ゲ", gupower: 20, chpower: 50, papower: 20, img: "img/hito.png", hp: 100, maxhp: 100, gupp: 4, chpp: 3, papp: 5, maxgupp: 4, maxchpp: 3, maxpapp: 5 },
    { name: "ゼ〇ガメ", gupower: 40, chpower: 10, papower: 30, img: "img/zeni.png", hp: 150, maxhp: 150, gupp: 3, chpp: 8, papp: 5, maxgupp: 3, maxchpp: 8, maxpapp: 5 },
  ]

  let name = [".status-infofushigi", ".status-infohito", ".status-infozeni"];
  for (let i = 0; i < 3; i++) {
    $(`${name[i]} li:nth-of-type(1)`).text(` ${charatypecolumn[i].name}`);
    $(`${name[i]} li:nth-of-type(2)`).text(`hp: ${charatypecolumn[i].maxhp}`);
    $(`${name[i]} li:nth-of-type(3)`).text(`gu: ${charatypecolumn[i].gupower}`);
    $(`${name[i]} li:nth-of-type(4)`).text(`ch: ${charatypecolumn[i].chpower}`);
    $(`${name[i]} li:nth-of-type(5)`).text(`pa: ${charatypecolumn[i].papower}`);
  }



  let charatypecolumnE = [
    { name: "ヤド〇", maxhp: 150, gupower: 40, chpower: 20, papower: 20, img: "img/yadon.png", gupp: 4, chpp: 5, papp: 6 },
    { name: "ピカチ〇ウ", maxhp: 110, gupower: 20, chpower: 30, papower: 50, img: "img/pika.png", gupp: 6, chpp: 4, papp: 3 },
    { name: "カ〇ネギ", maxhp: 130, gupower: 20, chpower: 40, papower: 20, img: "img/kamo.png", gupp: 4, chpp: 4, papp: 4 },
  ]

  const type = ['gu', 'ch', 'pa', 'cure', 'ppcure'];
  let powerlevel = ['なし', 'ふつう', '２倍'];
  let characterEchoice = [];
  let enemyHp;
  // characterchoice[0] = charatypecolumn.splice(Math.floor(Math.random() * charatypecolumn.length), 1);

  // 敵キャラクターのランダム選定
  characterEchoice[0] = charatypecolumnE.splice(Math.floor(Math.random() * charatypecolumnE.length), 1);
  console.log(characterEchoice[0]);
  console.log(charatypecolumnE);
  let characterE = characterEchoice[0];
  enemystatus();

  
  function next_battle() {
    console.log(charatypecolumnE);
    console.log(`characterEchoiceのなか${characterEchoice[0]}`);
    if (charatypecolumnE.length != 0) {
      // let cloumn = [];
      // cloumn[0] = characterEchoice.splice(0, 1);
      characterEchoice[0] = charatypecolumnE.splice(Math.floor(Math.random() * charatypecolumnE.length), 1);
      characterE = characterEchoice[0];
      console.log(characterEchoice);
      console.log(charatypecolumnE);
      $(".nameE").text(characterE[0].name);
      enemyHp = characterE[0].maxhp;
      $(".hpE, .maxHpE").text(enemyHp);
      let imgE = characterE[0].img;
      $(".enemyimg > img").attr('src', `${imgE}`);
      guppE = characterE[0].gupp;
      // console.log(`guppは${guppE}`);
      chppE = characterE[0].chpp;
      pappE = characterE[0].papp;
      $(".guppE").text(guppE);
      $(".chppE").text(chppE);
      $(".pappE").text(pappE);
      $(".enemyimg").show();
      $(".enemyimg").removeClass('hpzero');
      $(".enemyHp-container").hide();
      $(".enemyHp-container, .attac-list1, .attac-list2").hide();
      $(".enemyimg").addClass("slide-in1").one('animationend', function () {
        // アニメーション終了時にclassを削除
        $(".enemyHp-container").show();
        $("#message1").t('つぎのモンスターがでてきた', {
          caret: false, speed: 50,
        });
        $(this).removeClass('slide-in1');
        $("body").one('click', function () {
          $("#message1,.message2").hide();
          $(".attac-list1").show();
          $(".attac-list2").show();
        });
      });
    } else {
      $(".enemyHp-container").hide();
      $(".enemyHp-container, .attac-list1, .attac-list2").hide();
      $("#message1").t('かんぜんしょうり！！', {
        caret: false, speed: 50,
      });
      $("#message").one('click', function () {
        if (confirm("thank you for playing!")) {
          window.location.href = 'index.html'
        }
      });

    }
  };


  //味方ステータス設定まとまり
  function status() {
    hp = characterchoice[0].hp;
    $(".name").text(characterchoice[0].name);
    $(".hp").text(characterchoice[0].hp);
    $(".maxHp").text(characterchoice[0].maxhp);
    $(".alliesimg > img").attr('src', characterchoice[0].img);
    maxgupp = characterchoice[0].maxgupp;
    maxchpp = characterchoice[0].maxchpp;
    maxpapp = characterchoice[0].maxpapp;
    gupp = characterchoice[0].gupp;
    chpp = characterchoice[0].chpp;
    papp = characterchoice[0].papp;
    $(".gupp").text(gupp);
    $(".chpp").text(chpp);
    $(".papp").text(papp);
  }

  //敵のステータス設定のまとまり
  function enemystatus() {
    console.log(characterE);
    $(".nameE").text(characterE[0].name);
    enemyHp = characterE[0].maxhp;
    $(".hpE, .maxHpE").text(enemyHp);
    let imgE = characterE[0].img;
    $(".enemyimg > img").attr('src', `${imgE}`);
    guppE = characterE[0].gupp;
    // console.log(`guppは${guppE}`);
    chppE = characterE[0].chpp;
    pappE = characterE[0].papp;
    $(".guppE").text(guppE);
    $(".chppE").text(chppE);
    $(".pappE").text(pappE);
  }

  $(".change-fushigi").on('click', function () {
    characterchoice[0] = charatypecolumn[0];

    if (characterchoice[0].hp == 0) {
      // $(".alliesimg").addClass("opacityzero");
      $("#message1").t(`hpが0です`), {
        blink: false
      };
    } else {
      status();
      $(".alliesimg").removeClass("opacityzero");
      $(".item-list-change").hide();
      $(".hp-container").hide();
      $(".alliesimg").removeClass("hpzero");
      $(".alliesimg").addClass('change-animetion');
      //入れ替えアニメーションをいれること
      $('.change-animetion').one('animationend', function () {
        //アニメーションが終了したら下記を処理
        $(".hp-container").show();
        $(".alliesimg").removeClass('change-animetion');
        $("#message1").t('モンスターを入れかえた', {
          caret: false, speed: 50,
        });
        $("body").one('click', function () {
          $("#message1,.message2").hide();
          $(".attac-list1").show();
          $(".attac-list2").show();
        });
      });
    }
  });
  $(".change-hito").on('click', function () {
    characterchoice[0] = charatypecolumn[1];

    if (characterchoice[0].hp == 0) {
      // $(".alliesimg").addClass("opacityzero");
      $("#message1").t(`hpが0です`), {
        blink: false
      };
    } else {
      status();
      $(".alliesimg").removeClass("opacityzero");
      $(".item-list-change").hide();
      $(".hp-container").hide();
      $(".alliesimg").removeClass("hpzero");
      $(".alliesimg").addClass('change-animetion');
      //入れ替えアニメーションをいれること
      $('.change-animetion').one('animationend', function () {
        //アニメーションが終了したら下記を処理
        $(".hp-container").show();
        $(".alliesimg").removeClass('change-animetion');
        $("#message1").t('モンスターを入れかえた', {
          caret: false, speed: 50,
        });
        $("body").one('click', function () {
          $("#message1,.message2").hide();
          $(".attac-list1").show();
          $(".attac-list2").show();
        });
      });
    }
  });
  $(".change-zeni").on('click', function () {
    characterchoice[0] = charatypecolumn[2];

    if (characterchoice[0].hp == 0) {
      // $(".alliesimg").addClass("opacityzero");
      $("#message1").t(`hpが0です`), {
        blink: false
      };
    } else {
      status();
      $(".alliesimg").removeClass("opacityzero");
      $(".item-list-change").hide();
      $(".hp-container").hide();
      $(".alliesimg").removeClass("hpzero");
      $(".alliesimg").addClass('change-animetion');
      //入れ替えアニメーションをいれること
      $('.change-animetion').one('animationend', function () {
        //アニメーションが終了したら下記を処理
        $(".hp-container").show();
        $(".alliesimg").removeClass('change-animetion');
        $("#message1").t('モンスターを入れかえた', {
          caret: false, speed: 50,
        });
        $("body").one('click', function () {
          $("#message1,.message2").hide();
          $(".attac-list1").show();
          $(".attac-list2").show();
        });
      });
    }
  });



  function enemyChoice() {
    let choice = Math.floor(Math.random() * 3);
    return choice;
  };
  function enemyChoice2() {
    let choice = Math.floor(Math.random() * 3);
    return choice;
  };

  function curerandomNumber() {
    let choice = Math.floor((Math.random() * 10)-5) + 5;
    return choice;
  };

  


  function damege_choice() {
    if (attacType == "gu") {
      damege = characterchoice[0].gupower;
      return damege;
    } else if (attacType == "ch") {
      damege = characterchoice[0].chpower;
      return damege;
    } else {
      damege = characterchoice[0].papower;
      return damege;
    }
  }

  function damegeE_choice() {
    if (enemyAttac == 0) {
      damegeE = characterE[0].gupower;
      return damegeE;
    } else if (enemyAttac == 1) {
      damegeE = characterE[0].chpower;
      return damegeE;
    } else if (enemyAttac == 2) {
      damegeE = characterE[0].papower;
      return damegeE;
    }
  }

  function attac_animation_choice() {
    if (attacType == "pa") {
      attac_animation_pa();
    } else if (attacType == "ch") {
      attac_animation_ch();
    } else if (attacType == "gu") {
      attac_animation();
    }
  };
  function attac_animation_Echoice() {
    if (enemyAttac == 0) {
      attac_animationE();
    } else if (enemyAttac == 1) {
      attac_animation_Ech();
    } else if (enemyAttac == 2) {
      attac_animation_Epa();
    }
  };

  $(".gu").on('click', function () {
    if (gupp != 0) {
      attacType = type[0];
      $(".attac-list1").hide();
      gupp -= 1;
      $(".gupp").text(gupp);
      // console.log(gupp);
    } else {
      $("#message1").t(`ppが0です`), {
        blink: false
      };
    }
  });

  $(".ch").on('click', function () {
    attacType = type[1];
    if (chpp != 0) {
      $(".attac-list1").hide();
      chpp -= 1;
      $(".chpp").text(chpp);
    } else {
      $("#message1").t(`ppが0です`), {
        blink: false
      };
    }
  });

  $(".pa").on('click', function () {
    attacType = type[2]
    if (papp != 0) {
      $(".attac-list1").hide();
      papp -= 1;
      $(".papp").text(papp);
    } else {
      $("#message1").t(`ppが0です`), {
        blink: false
      };
    }
  });

  $(".item").on('click', function () {
    $(".attac-list1").hide();
    $(".attac-list2").hide();
    $(".item-list").show();
    $("#message1").t(`えらんでください`), {
      blink: false
    };
  });
  $(".change").on('click', function () {
    $(".item-list").hide();
    $(".item-list-change").show();
    $("#message1").t(`えらんでください`), {
      blink: false
    };
  });
  $(".kaifuku").on('click', function () {
    $(".item-list-kaifuku").show();
    $(".item-list").hide();
    $("#message1").t(`えらんでください`), {
      blink: false
    };
  });

  $(".cure").on('click', function () {
    attacType = type[3]
    $(".attac-list1").hide();
    $(".attac-list2").hide();
    $(".item-list-kaifuku").hide();
  });

  $(".ppcure").on('click', function () {
    attacType = type[4];
    // $(".attac-list1").hide();
    // $(".attac-list2").hide();
    $(".item-list-kaifuku").hide();
  });

  $(".smallAttac").on('click', function () {
    power = 1;
    $(".attac-list2").hide();
  });
  $(".specialAttac").on('click', function () {
    power = 2;
    $(".attac-list2").hide();
  });


  //攻撃コマンドをクリックしたときの処理
  $(".attac, .cure, .ppcure").on('click', function () {

    //敵のppの残りによって出すパターンが変わる処理
    function ppEminus() {
      if (enemyAttac == 0) {
        guppE -= 1;
        $(".guppE").text(guppE);
      } else if (enemyAttac == 1) {
        chppE -= 1;
        $(".chppE").text(chppE);
      } else if (enemyAttac == 2) {
        pappE -= 1;
        $(".pappE").text(pappE);
      }
    }
    let array = [0, 1, 2];
    if (guppE == 0 && chppE > 0 && pappE > 0) {
      array.splice(0, 1);
      // console.log(`array${array}`);
      // console.log(`array.length${array.length}`);
      enemyAttac = array[Math.floor(Math.random() * array.length)];
      // console.log(`enemyAttac${enemyAttac}`);
    } else if (guppE > 0 && chppE == 0 && pappE > 0) {
      array.splice(1, 1);
      // console.log(`array${array}`);
      // console.log(`array.length${array.length}`);
      enemyAttac = array[Math.floor(Math.random() * array.length)];
      // console.log(`enemyAttac${enemyAttac}`);
    } else if (guppE > 0 && chppE > 0 && pappE == 0) {
      array.splice(2, 1);
      // console.log(`array${array}`);
      // console.log(`array.length${array.length}`);
      enemyAttac = array[Math.floor(Math.random() * array.length)];
      // console.log(`enemyAttac${enemyAttac}`);
    } else if (guppE == 0 && chppE == 0 && pappE > 0) {
      enemyAttac = 2;
    } else if (guppE == 0 && chppE > 0 && pappE == 0) {
      enemyAttac = 1;
    } else if (guppE > 0 && chppE == 0 && pappE == 0) {
      enemyAttac = 0;
    } else if (guppE == 0 && chppE == 0 && pappE == 0) {
      enemyAttac = "nopp";
      // console.log(enemyAttac);
      enemyHp -= damege_choice() * power;
    } else {
      enemyAttac = enemyChoice();
    }

    // type = ['gu', 'ch', 'pa', 'cure', 'ppcure'];
    // attacType・・guボタンでtype[0]、chボタンでtype[1]、paボタンでtype[2]・・・・
    //クリーンヒット乱数
    function cleanhitrandomNumber() {
      let choice = Math.floor(Math.random() * 4);
      return choice;
    };
    let cleanhit;
    let cleanhitdamege;
    cleanhit = cleanhitrandomNumber();
    if (cleanhit == 0) {
      cleanhitdamege = 2;
    } else {
      cleanhitdamege = 1;
    }
    if (attacType == type[0]) {
      ppEminus();
      switch (enemyAttac) {
        case 0:
          hp -= 0 * power;
          enemyHp -= 0 * power * cleanhitdamege;
          break;
        case 1:
          hp -= 0 * power;
          enemyHp -= damege_choice() * power * cleanhitdamege;
          break;
        case 2:
          hp -= damegeE_choice() * power * cleanhitdamege;
          enemyHp -= 0 * power;
          // console.log(damegeE_choice());
          break;
      }
    } else if (attacType == type[1]) {
      ppEminus();
      switch (enemyAttac) {
        case 0:
          hp -= damegeE_choice() * power * cleanhitdamege;
          // console.log(damegeE_choice());
          enemyHp -= 0 * power;
          break;
        case 1:
          hp -= 0 * power;
          enemyHp -= 0 * power;
          break;
        case 2:
          hp -= 0 * power;
          enemyHp -= damege_choice() * power * cleanhitdamege;
          break;
      }
    } else if (attacType == type[2]) {
      ppEminus();
      switch (enemyAttac) {
        case 0:
          hp -= 0 * power;
          enemyHp -= damege_choice() * power * cleanhitdamege;
          break;
        case 1:
          hp -= damegeE_choice() * power * cleanhitdamege;
          enemyHp -= 0 * power;
          // console.log(damegeE_choice());
          break;
        case 2:
          hp -= 0 * power;
          enemyHp -= 0 * power;
          break;
      }
    } else if (attacType == type[3]) {
      let number = curerandomNumber();
      let enemychoice2 = enemyChoice2();
      let messagebun2 = `きずぐすりをしようした<br>HPを${10 * number}かいふくした<br>`;
      switch (enemychoice2) {
        case 0:
          hp += 10 * number;
          if (hp > characterchoice[0].maxhp) {
            hp = characterchoice[0].maxhp;
            $(".hp").text(hp);
          } else {
            $(".hp").text(hp);
          }
          hp -= 0;
          $("#message1").t(`${messagebun2}てきはこうげきしなかった<br>`), {
            blink: false
          };
          statusUpdate();
          break;
        case 1:
          hp += 10 * number;
          if (hp > characterchoice[0].maxhp) {
            hp = characterchoice[0].maxhp;
            $(".hp").text(hp);
          } else {
            $(".hp").text(hp);
          }
          hp -= 20;
          $("#message1").t(`${messagebun2}てきのこうげき<br>ダメージをくらった`), {
            blink: false
          };
          attac_animationE();
          damege_animation();
          statusUpdate();
          break;
        case 2:
          hp += 10 * number;
          if (hp > characterchoice[0].maxhp) {
            hp = characterchoice[0].maxhp;
            $(".hp").text(hp);
          } else {
            $(".hp").text(hp);
          }
          hp -= 50;
          $("#message1").t(`${messagebun2}てきのこうげき<br>大ダメージをくらった`), {
            blink: false
          };
          attac_animationE();
          damege_animation();
          statusUpdate();
          break;
      }
    } else if (attacType == type[4]) {
      console.log(`アタックタイプ${attacType}`);
      let number = curerandomNumber();
      // let enemychoice2 = 0;
      let enemychoice2 = enemyChoice2();
      let ppcolumn = [gupp, chpp, papp];
      let ppmaxcolumn = [maxgupp, maxchpp, maxpapp];
      let messagebun2 = `PPかいふくをしようした<br>PPを${number}かいふくした<br>`;
      switch (enemychoice2) {
        case 0:
          for (let i = 0; i < ppcolumn.length; i++) {
            ppcolumn[i] += number;
            console.log(`配列の中の${i}ののこり${ppcolumn[i]}`);
            if (ppcolumn[i] > ppmaxcolumn[i]) {
              console.log(`ppのこり${ppcolumn[i]} > maxpp${ppmaxcolumn[i]}`);
              ppcolumn[i] = ppmaxcolumn[i];
            } else {
            }
          }
          gupp = ppcolumn[0];
          chpp = ppcolumn[1];
          papp = ppcolumn[2];
          $(".gupp").text(gupp);
          $(".chpp").text(chpp);
          $(".papp").text(papp);

          hp -= 0;
          $("#message1").t(`${messagebun2}てきはこうげきしなかった<br>`), {
            blink: false
          };
          break;
        case 1:
          for (let i = 0; i < ppcolumn.length; i++) {
            ppcolumn[i] += number;
            if (ppcolumn[i] > ppmaxcolumn[i]) {
              ppcolumn[i] = ppmaxcolumn[i];
            } else {
            }
          }
          gupp = ppcolumn[0];
          chpp = ppcolumn[1];
          papp = ppcolumn[2];
          $(".gupp").text(gupp);
          $(".chpp").text(chpp);
          $(".papp").text(papp);

          hp -= 20;
          $("#message1").t(`${messagebun2}てきのこうげき<br>ダメージをくらった`), {
            blink: false
          };
          attac_animationE();
          damege_animation();
          break;
        case 2:
          for (let i = 0; i < ppcolumn.length; i++) {
            ppcolumn[i] += number;
            console.log(`配列の中の${i}ののこり${ppcolumn[i]}`);
            if (ppcolumn[i] > ppmaxcolumn[i]) {
              console.log(`ppのこり${ppcolumn[i]} > maxpp${ppmaxcolumn[i]}`);
              ppcolumn[i] = ppmaxcolumn[i];
            } else {
            }
          }
          gupp = ppcolumn[0];
          chpp = ppcolumn[1];
          papp = ppcolumn[2];
          $(".gupp").text(gupp);
          $(".chpp").text(chpp);
          $(".papp").text(papp);

          hp -= 50;
          $("#message1").t(`${messagebun2}てきのこうげき<br>大ダメージをくらった`), {
            blink: false
          };
          attac_animationE();
          damege_animation();
          break;
      }
    }

    let messagebun = `タイプ${attacType}の${powerlevel[power]}こうげき<br>
      てき、タイプ${type[enemyAttac]}のこうげき<br>`

    //HPが残っているとき
    if (enemyHp > 0 && hp > 0) {
      ///////////////////////////////////////
      if (attacType == type[3]) {
        console.log(`attacTypeは${type[3]}`);
      } else if (attacType == type[4]) {
        console.log(`attacTypeは${type[4]}`);
      } else {
        if (attacType == type[enemyAttac]) {
          $("#message1").t(
            `${messagebun}引き分け<br>`, {
            blink: false
          });
          statusUpdate();
        } else {
          let result = (type.indexOf(attacType) - enemyAttac + 3) % 3;
          if (result == 1) {
            if (cleanhitdamege == 1) {
              $("#message1").t(
                `${messagebun}カウンターをくらった<br>`, {
                blink: false
              });
            } else if (cleanhitdamege == 2) {
              $("#message1").t(
                `${messagebun}カウンターをくらった<br>きゅうしょにあたった`, {
                blink: false
              });
            }
            statusUpdate();
            attac_animation_Echoice();
            damege_animation();
          } else if (result == 2) {
            if (cleanhitdamege == 1) {
              $("#message1").t(
                `${messagebun}かわしてこうげきを当てた<br>`, {
                blink: false
              });
            } else if (cleanhitdamege == 2) {
              $("#message1").t(
                `${messagebun}かわしてこうげきを当てた<br>きゅうしょにあたてた`, {
                blink: false
              });
            }
            statusUpdate();
            attac_animation_choice();
            damege_animationE();

          } else {
            $("#message1").t(
              `タイプ${attacType}の${powerlevel[power]}こうげき<br>てきはうごけない<br>ダメージをあたえた`, {
              blink: false
            });
            statusUpdate();
            attac_animation_choice();
            damege_animationE();
          }
          console.log('next turn');
        }
        /////////////////////////////////////////
      }


      $("#message").one('click', function () {
        $("#message1").hide();
        $(".message2").hide();
        $(".attac-list1").show();
        $(".attac-list2").show();
      });
      //敵のHPが０以下になったとき勝利
    } else if (enemyHp <= 0 && hp > 0) {
      if (guppE == 0 && chppE == 0 && pappE == 0) {
        $("#message1").t(
          `タイプ${attacType}の${powerlevel[power]}こうげき<br>てきはうごけない<br>ダメージをあたえた`, {
          blink: false
        });
        statusUpdate();
        attac_animation_choice();
        damege_animationE();
        enemyHp = 0;
        hpzeroE();
        $("#message1").t('<br>you win');
        $("#message").one('click', function () {
          $("#message1").hide();
          $(".attac-list1").show();
          $(".attac-list2").show();
          next_battle();
        });
      } else {
        enemyHp = 0;
        if (cleanhitdamege == 1) {
              $("#message1").t(
                `${messagebun}かわしてこうげきを当てた<br>`, {
                blink: false
              });
            } else if (cleanhitdamege == 2) {
              $("#message1").t(
                `${messagebun}かわしてこうげきを当てた<br>きゅうしょにあたてた`, {
                blink: false
              });
            }
        statusUpdate();
        attac_animation_choice();
        damege_animationE();
        enemyHp = 0;
        hpzeroE();
        $("#message1").t('<br>you win');
        $("#message").one('click', function () {
          $("#message1").hide();
          $(".attac-list1").show();
          $(".attac-list2").show();
          next_battle();
        });
      }
      //味方のHPが0になったとき負け
    } else if (enemyHp > 0 && hp <= 0 && attacType != type[3]) {
      if (cleanhitdamege == 1) {
        $("#message1").t(
          `${messagebun}カウンターをくらった<br>`, {
          blink: false
        });
      } else if (cleanhitdamege == 2) {
        $("#message1").t(
          `${messagebun}カウンターをくらった<br>きゅうしょにあたった`, {
          blink: false
        });
      }
      hp = 0;
      statusUpdate();
      attac_animation_Echoice();
      damege_animation()
      hpzero();
      next_change();
    } else if (enemyHp > 0 && hp <= 0 && attacType == type[3]) {
      $("#message1").t('you lose');
      hp = 0;
      hpzero();
      statusUpdate();
      console.log(charatypecolumn);
      next_change();
    } else if (enemyHp > 0 && hp <= 0 && attacType == type[4]) {
      $("#message1").t('you lose');
      hp = 0;
      hpzero();
      statusUpdate();
      console.log(charatypecolumn);
      next_change();
      attacType;
    }
    // 各アニメーションが終了して処理
    $(".alliesimg, .enemyimg, .attac-effectpa, .attac-effectch, .attac-effectEpa, .attac-effectEch, .hpzero").on('animationend', function () {
      $(".hp").text(hp);
      $(".hpE").text(enemyHp);
    });


    function statusUpdate() {
      for (let i = 0; i < 3; i++) {
        if (charatypecolumn[i].name == characterchoice[0].name) {
          charatypecolumn[i].hp = hp;
          charatypecolumn[i].gupp = gupp;
          charatypecolumn[i].chpp = chpp;
          charatypecolumn[i].papp = papp;
          console.log(charatypecolumn[i]);
        }
      }
    }
  });

  function next_change() {
    if (charatypecolumn[0].hp == 0 && charatypecolumn[1].hp == 0 && charatypecolumn[2].hp == 0) {
      $("#message").one('click', function () {
        $("#message1").t(`game over`), {
          blink: false
        };
      });

    } else {
      $("#message1").t('<br>hpが0になった');
      $("#message").one('click', function () {
        $(".item-list-change").show();
        $("#message1").t(`選んでください`), {
          blink: false
        };
      });
    }
  }



  //↓以下アニメーション関数

  //味方側の攻撃アニメーションgu
  function attac_animation() {
    $(".alliesimg").addClass("attac-animation").on('animationend', function () {
      // アニメーション終了時にclassを削除
      $(this).removeClass('attac-animation');
    });
  };
  //味方側の攻撃アニメーションch
  function attac_animation_ch() {
    $(".attac-effectch div").addClass("attac-animationch").on('animationend', function () {
      // アニメーション終了時にclassを削除
      $(this).removeClass('attac-animationch');
    });
  };
  //味方側の攻撃アニメーションpa
  function attac_animation_pa() {
    $(".attac-effectpa div").addClass("attac-animationpa").on('animationend', function () {
      // アニメーション終了時にclassを削除
      $(this).removeClass('attac-animationpa');
    });
  };

  //敵側の攻撃アニメーションgu
  function attac_animationE() {
    $(".enemyimg").addClass("attac-animationE").on('animationend', function () {
      // アニメーション終了時にclassを削除
      $(this).removeClass('attac-animationE');
    });
  };
  //敵側の攻撃アニメーションch
  function attac_animation_Ech() {
    $(".attac-effectEch div").addClass("attac-animationEch").on('animationend', function () {
      // アニメーション終了時にclassを削除
      $(this).removeClass('attac-animationEch');
    });
  };
  //敵側の攻撃アニメーションpa
  function attac_animation_Epa() {
    $(".attac-effectEpa").addClass("attac-animationEpa").on('animationend', function () {
      // アニメーション終了時にclassを削除
      $(this).removeClass('attac-animationEpa');
    });
  };

  //味方側のdamege
  function damege_animation() {
    $(".alliesimg").addClass("damege").on('animationend', function () {
      // アニメーション終了時にclassを削除
      $(this).removeClass('damege');
    });
  };

  //敵側のdamege
  function damege_animationE() {
    $(".enemyimg").addClass("damege").on('animationend', function () {
      // アニメーション終了時にclassを削除
      $(this).removeClass('damege');
    });
  };
  //味方のHPが0になったときのアニメーション
  function hpzero() {
    $(".img-mask").addClass("img-mask-active");
    $(".alliesimg").addClass("hpzero").on('animationend', function () {
      // アニメーション終了時にclassを削除
      // $(this).removeClass('hpzero');
      $(".img-mask").removeClass("img-mask-active");
    });
  };
  //敵のHPが0になったときのアニメーション
  function hpzeroE() {
    $(".img-maskE").addClass("img-mask-activeE");
    $(".enemyimg").addClass("hpzero").on('animationend', function () {
      // アニメーション終了時にclassを削除
      $(".img-maskE").removeClass("img-mask-activeE");
    });
  };


}