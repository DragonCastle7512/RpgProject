const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const
//Defalut
X = canvas.width/2, 
Y = canvas.height/2,

Start_ui_text_x = X, Start_ui_text_y = Y-180, 
Start_ui_text_font_size = 150, 
Start_ui_text_color = "rgb(170, 50, 183)",

Start_ui_button_width = 400, Start_ui_button_height = 125, 
Start_ui_button_corner = 100, 
Start_ui_button_stroke_size = 8, 
Start_ui_button_font_size = 70, 
Start_ui_button_color = "rgb(224, 200, 235)", 
Start_ui_button_hover_radius = 5,

Vignetting_time = 60, 
Vignetting_opacity_amount = 0.025, 
Vignetting_delay = 15,

Esc_ui_width = canvas.width/4, Esc_ui_height = canvas.height-300, 
Esc_line_size = 20,
Esc_ui_menu_width = 350, Esc_ui_menu_height = 150, 
Esc_ui_menu_font_size = 60,
Esc_ui_button_hover_radius = 4,

Play_background_image = "url(./image/background.png)", 
Play_background_size = "50%",
Start_background_imgae = "url(./image/start_background.jpg)", 
Start_background_size = "cover",

//Skill Enforce
Enforce_ui_width = canvas.width-600, Enforce_ui_height = canvas.height-300, 
Enforce_ui_line_size = 30,
Enforce_ui_skill_area_x = 9, Enforce_ui_skill_area_y = 4.5, 
Enforce_ui_font_size = Enforce_ui_width/50, 
Enforce_ui_reset_interval = 120, 
Enforce_impossible_color = "rgb(0, 0, 0, 0.4)",
Enforce_text_font_size = Enforce_ui_width/70,
Enfroce_hp_increase = 1, Enfroce_mana_increase = 2,

Space_cooldown_reduce_amount_01 = 0.5, 
Space_distance_increase_amount = 100, 
Space_speed_up_amount = 1, 
Space_speed_up_duration = 1, 
Space_mana_recovery_amount = 10, 
Space_cooldown_reduce_amount_02 = 1.5, 
Space_back_ability_duration = 2,
Teleport_projectile_damage = 2, 
Teleport_projectile_speed = 10, 
Teleport_projectile_hit_size = 40,

Q_addition_damage_amount_01 = 1, 
Q_cooldown_reduce_amount = 0.2, 
Q_mana_reduce_amount = 5, 
Q_addition_speed_amount = 5, 
Fear_stack_count = 3, 
Fear_damage = 10, 
Fear_explosion_size = 100, 
Q_addition_damage_amount_02 = 2, 
Q_mana_recovery_amount = 1,
Harvestring_stack_count = 10,

E_mana_reduce_amount_01 = 5, 
E_hp_recovery_amount_01 = 5,
E_cooldown_reduce_amount_01 = 1, 
E_hp_recovery_amount_02 = 10, 
Hp_steal_damage = 5, 
Hp_steal_projectile_size = 20, 
Hp_steal_projectile_hit_size = 60, 
Hp_steal_projectile_speed = 15, 
E_mana_reduce_amount_02 = 10, 
E_cooldown_reduce_amount_02 = 2, 
Soul_width = 20, Soul_height = 30, 
Soul_speed = 20, 
E_speed_up_duration = 1, 
E_speed_up_amount = 1, 
E_soul_addition_damage_amount_01 = 1, 
E_soul_addition_damage_amount_02 = 2, 
Soul_random_spawn_range = 100,

R_addition_damage_amount = 2, 
R_mana_reduce_amount = 10, 
R_frequence_reduce_amount = 15, 
R_cooldown_reduce_amount_01 = 3, 
R_slow_amount = 1, 
R_slow_duration = 60, 
R_shoke_duration = 60*7, 
Shoke_damage = 2, 
R_duration_amount_01 = 1, 
R_cooldown_reduce_amount_02 = 7, 
R_duration_amount_02 = 3, 
R_cooldown_ability_amount = 0.3,

//Stage
Object_ui_font_size = 20, 
Object_ui_interval = 10,
Object_ui_width = 300, Object_ui_height = Object_ui_font_size+Object_ui_interval, 
Object_ui_x = canvas.width-Object_ui_width-20 , Object_ui_y = 20,
Tutorial_object_count = 3,

Tutorial_ui_text_x = X, Tutorial_ui_text_y = canvas.height-170, 
Tutorial_ui_button_width = 1000, Tutorial_ui_button_height = 50, 
Tutorial_ui_button_corner = 40,
Tutorial_ui_button_stroke_size = 8, 
Tutorial_ui_button_color = "white", 
Tutorial_ui_button_font_size = 30,
Scarecrow_width = 100, Scarecrow_height = 150,

Stage_ui_text_x = X, Stage_ui_text_y = -115, 
Stage_ui_button_width = 300, Stage_ui_button_height = 60, 
Stage_ui_button_corner = 30, 
Stage_ui_button_stroke_size = 5, 
Stage_ui_button_color = "white", 
Stage_ui_button_font_size = 25,
Monster_name =  ["슬라임", "벌레무리", "까마귀", "멧돼지", "타르", "그림자 늑대","플로워", "시들어버린 꽃", "식인 꽃",
                "가오리", "해파리", "문어", "바다 괴수"],
Battle = 0, Survival = 1,
Stage_mode =    [null, Battle, Battle, Survival, Battle, Battle, Battle, Survival, Battle, Battle, Battle,
                Battle, Battle, Survival, Battle, Survival],

Survival_stage_time =   [0, 0, 0, 30, 0, 0, 0, 45, 0, 0, 0,
                        0, 0, 30, 0, 60, 0]
class SpawnInfor {
    constructor(monster, spawnTime, objectCount) {
        this.monster = monster;
        this.spawnTime = spawnTime;
        this.objectCount = objectCount;
    }
}
const
//스테이지별 (몬스터 번호, 생성시간, 처치목표량)
SpawnList = [[],
            [new SpawnInfor(0, 7, 1)],
            [new SpawnInfor(0, 5, 5), new SpawnInfor(1, 7, 3)],
            [new SpawnInfor(2, 2, 0)],
            [new SpawnInfor(1, 5, 5), new SpawnInfor(2, 5, 4)],
            [new SpawnInfor(1, 5, 5), new SpawnInfor(2, 6, 4), new SpawnInfor(3, 7, 3)],
            [new SpawnInfor(3, 5, 4), new SpawnInfor(4, 7, 5)],
            [new SpawnInfor(4, 3, 0), new SpawnInfor(5, 5, 0)],
            [new SpawnInfor(4, 7, 4), new SpawnInfor(5, 7, 4), new SpawnInfor(6, 9, 3)],
            [new SpawnInfor(5, 4, 5), new SpawnInfor(6, 5, 5)],
            [new SpawnInfor(8, 1, 1)],

            [new SpawnInfor(9, 5, 5)], 
            [new SpawnInfor(9, 7, 3), new SpawnInfor(10, 7, 6)],
            [new SpawnInfor(11, 4, 0)],
            [new SpawnInfor(10, 3, 5), new SpawnInfor(11, 5, 5)],
            [new SpawnInfor(12, 1, 0)]],
Default_spawn_time  = 5,

//Main Character
//Default 5, 75
Hp = 5, Mana = 75, 
Movement_speed = 5, 
Level = 1, 
Next_exp = 5, 
Next_exp_magnification = 1.5,
Character_width = 90, Character_height = 125,

Space_skill_cooldown = 8, 
Portal_distance = 250, 
Portal_size = 100, 
Teleport_projectile_size = 30,

Q_skill_cooldown = 1.9, 
Q_skill_mana = 15, 
Q_skill_damage = 1, 
Q_skill_speed = 7, 
Flame_size = 50, 
Flame_hit_size = 40,

E_skill_cooldown = 14, 
E_skill_mana = 30, 
E_skill_amount = 5, 
Dead_whisper_size = 125, 
E_skill_effect_time = 1,

R_skill_cooldown = 23, 
R_skill_mana = 50, 
R_skill_damage = 5, 
R_frequence = 30,
R_skill_effect_time = 5, 
Black_storm_cloud_width = 500, 
Black_storm_cloud_height = 150, 
Black_storm_cloud_distance = 300, 
Black_storm_cloud_add_y = 150,
Black_storm_range_width = -200, 
Black_storm_range_height = -50, 
Black_storm_thunder_width = 50, 
Black_storm_thunder_height = 250, 
R_thunder_image_time = 8,

//Monster
Ranged_stop_time = 60,
Monster_hp_bar_height = 10, 
Collision_delay = 60,

Slime_width = 75, Slime_height = 50, 
Slime_hp = 2, 
Slime_damage = 1, 
Slime_speed = 2, 
Slime_exp = 1,

Bugs_width = 75, Bugs_height = 75, 
Bugs_hp = 4, 
Bugs_damage = 1, 
Bugs_speed = 2, 
Bugs_exp = 2, 
Bugs_speed_up_time = 30,

Crow_width = 75, Crow_height = 75, 
Crow_hp = 3, 
Crow_speed = 3, 
Crow_exp = 2, 
Crow_attack_speed = 180, 
Crow_projectile_speed = 12,
Crow_attack_damage = 1, 
Crow_projectile_width = 21, Crow_projectile_height = 45,

WildBoar_width = 75, WildBoar_height = 50,
WildBoar_hp = 4,
WildBoar_damage = 4,
WildBoar_speed = 4,
WildBoar_exp = 3,
WildBoar_speed_up_time = 180,
WildBoar_ability_speed_reduce = 2,
WildBoar_ability_damage_reduce = 2,

Tar_width = 75, Tar_height = 50,
Tar_hp = 5,
Tar_speed = 3,
Tar_exp = 3,
Tar_attack_speed = 180,
Tar_projectile_speed = 12,
Tar_attack_damage = 2,
Tar_projectile_width = 30, Tar_projectile_height = 30,
Tar_projectile_slow_amount = 2,
Tar_projectile_slow_time = 60,

ShadowWolf_width = 65, ShadowWolf_height = 50,
ShadowWolf_hp = 7,
ShadowWolf_damage = 5,
ShadowWolf_speed = 3,
ShadowWolf_exp = 4,
ShadowWolf_ability_magnification = 0.2,

Floower_width = 65, Floower_height = 70,
Floower_hp = 10,
Floower_damage = 6,
Floower_speed = 2,
Floower_exp = 6,
Floower_summonCount = 2,

WitheredFlower_width = 50, WitheredFlower_height = 40,
WitheredFlower_hp = 5,
WitheredFlower_damage = 4,
WitheredFlower_speed = 3,
WitheredFlower_exp = 0,

ManEatingFlower_width = 100, ManEatingFlower_height = 100,
ManEatingFlower_hp = 100,
ManEatingFlower_damage = 8,
ManEatingFlower_speed = 1,
ManEatingFlower_exp = 75,
ManEatingFlower_skill1_cooldown = 16,
ManEatingFlower_skill1_damage = 5,
ManEatingFlower_skill1_count = 15,
ManEatingFlower_skill2_cooldown = 10,
ManEatingFlower_skill2_damage = 10,
ManEatingFlower_skill2_speed = 10,
ManEatingFlower_skill2_time = 15,

WarningZone_width = 50,
WarningZone_height = 50,
WarningZone_duration = 60,

Ray_width = 60, Ray_height = 50,
Ray_hp = 12,
Ray_damage = 7,
Ray_speed = 2.5,
Ray_exp = 10,

Jellyfish_width = 60, Jellyfish_height = 70,
Jellyfish_hp = 15,
Jellyfish_damage = 10,
Jellyfish_speed = 3.5,
Jellyfish_exp = 12,

PoisonZone_width = 150,
PoisonZone_height = 150,
PoisonZone_damage = 3,
PoisonZone_duration = 3*60,
PoisonZone_delaytime = 60,

Octopus_width = 60, Octopus_height = 60,
Octopus_hp = 18,
Octopus_speed = 3,
Octopus_exp = 15,
Octopus_attack_speed = 180,
Octopus_projectile_speed = 10,
Octopus_attack_damage = 8,
Octopus_projectile_width = 35, Octopus_projectile_height = 35,

SeaMonster_width = 100, SeaMonster_height = 100,
SeaMonster_hp = 1000,
SeaMonster_damage = 14,
SeaMonster_speed = 0,
SeaMonster_exp = 1000,
SeaMonster_skill1_cooldown = 10,
SeaMonster_skill1_time = 60,
SeaMonster_skill2_cooldown = 0.5,
SeaMonster_skill2_damage = 14,
SeaMonster_skill2_size = 50,
SeaMonster_skill2_duration = 40,
SeaMonster_skill3_cooldown = 12,
SeaMonster_projectile_width = 35,
SeaMonster_projectile_height = 35,

WaterDrop_slow_amount = 4,
WaterDrop_slow_time = 60,
WaterDropDamage = 8,
WaterDrop_projectile_speed = 10,

//Damage Text
Damage_text_gravity = 2, 
Damage_text_gravity_speed = 0.5, 
Damage_text_font_size = 35,

//Sub UI
Condition_ui_width = 40*8, Condition_ui_height = 18*8, 
Condition_ui_x = 10, Condition_ui_y = canvas.height-Condition_ui_height,

Skill_ui_size = 80,
Skill_ui_interval = 100,
Skill_ui_x = canvas.width-Skill_ui_interval*4, Skill_ui_y = canvas.height-Skill_ui_size-15,

Skill_key_ui_font_size = 13,
Skill_key_ui_x = canvas.width-Skill_ui_interval*4+Skill_key_ui_font_size-2, Skill_key_ui_y = canvas.height-20, 
Skill_key_ui_width = 60, Skill_key_ui_height = 15,

Cooldown_ui_radius = 40, 
Cooldown_ui_x = canvas.width-Skill_ui_interval*4+Cooldown_ui_radius, Cooldown_ui_y = canvas.height-55, 
Cooldown_ui_color = "rgb(150, 150, 150)", 
Cooldown_ui_background_color = "rgb(74, 74, 74)", 
Cooldown_ui_stoke_color = "black", 
Cooldown_ui_impossible_color = "rgb(150, 150, 150, 0.8)",
Level_font_size = 20, 
Level_x = 200, Level_y = canvas.height-105, Level_color = "black", 
Level_up_font_size = 30, 
Level_up_color = "white", 
Level_up_time = 30;

let images = [
    //메인 캐릭터 (0~7)
    "character_back_01",
    "character_back_02",
    "character_right_01",
    "character_right_02",
    "character_front_01",
    "character_front_02",
    "character_left_01",
    "character_left_02",
    //차원이동 포탈 (8~9)
    "teleport_front",
    "teleport_side",
    //어둠 불꽃 발사체 (10~18)
    "dark_flame_up_01",
    "dark_flame_up_02",
    "dark_flame_right_01",
    "dark_flame_right_02",
    "dark_flame_down_01",
    "dark_flame_down_02",
    "dark_flame_left_01",
    "dark_flame_left_02",
    "dark_flame_hit",
    //슬라임 (19~21)
    "slime_01",
    "slime_02",
    "slime_hit",
    //메인 UI (22~26)
    "condition_ui",
    "space_skill_ui",
    "q_skill_ui",
    "e_skill_ui",
    "r_skill_ui",
    //망자의 속삭임(27~29)
    "dead_whisper_01",
    "dead_whisper_02",
    "dead_whisper_03",
    //검은 폭풍우(30~32)
    "black_storm_cloud",
    "black_storm_thunder_01",
    "black_storm_thunder_02",
    //튜토리얼 목표점(33)
    "tutorial_object",
    //허수아비(34)
    "scarecrow",
    //스텟 아이콘(35~38)
    "stat_hp",
    "stat_mana",
    "enforce_up",
    "enforce_down",
    //텔레포트 투사체(39~40)
    "teleport_projectile",
    "teleport_projectile_hit",
    //어둠 불꽃 폭발(41)
    "dark_flame_explosion",
    //체력 훔치기(42~43)
    "hp_steal",
    "hp_steal_hit",
    //영혼(44)
    "soul",
    //감전(45~46)
    "shock_01",
    "shock_02"
];
let monster_images = [
    [
        "slime_01",
        "slime_02",
        "slime_hit"
    ],
    [
        "bugs_01",
        "bugs_02",
        "bugs_hit"
    ],
    [
        "crow_01",
        "crow_02",
        "crow_hit",
        "crow_projectile"
    ],
    [
        "wild_boar_01",
        "wild_boar_02",
        "wild_boar_hit"
    ],
    [
        "tar_01",
        "tar_02",
        "tar_hit",
        "tar_projectile"
    ],
    [
        "shadow_wolf_01",
        "shadow_wolf_02",
        "shadow_wolf_hit"
    ],
    [
        "floower_01",
        "floower_02",
        "floower_hit"
    ],
    [
        "withered_floower_01",
        "withered_floower_02",
        "withered_floower_hit"
    ]
]
//load
const profile = new Image();
profile.src = "./image/profile.jpg";
let img = new Array();
for(i = 0; i < images.length; i++){
    img[i] = new Image();
    img[i].src = "./image/"+images[i]+".png";
}
let monster_img = new Array();
for(i = 0; i < monster_images.length; i++) {
    monster_img[i] = new Array();
    for(j = 0; j < monster_images[i].length; j++) {
        monster_img[i][j] = new Image();
        monster_img[i][j].src = "./image/"+monster_images[i][j]+".png";
    }
}
function two_point_distance(x1, x2, y1, y2) {
    return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}
function get_random_value(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function collision(object1, object2) {
    let x1 = object1.x, x2 = object1.x+object1.width, y1 = object1.y, y2 = object1.y+object1.height;
    let x3 = object2.x, x4 = object2.x+object2.width, y3 = object2.y, y4 = object2.y+object2.height;
    return ((x1 >= x3 && x1 <= x4 && y1 >= y3 && y1 <= y4) || (x2 >= x3 && x2 <= x4 && y1 >= y3 && y1 <= y4) || (x1 >= x3 && x1 <= x4 && y2 >= y3 && y2 <= y4) || (x2 >= x3 && x2 <= x4 && y2 >= y3 && y2 <= y4)
            || ((x1 >= x3 && x1 <= x4 && x2 >= x3 && x2 <= x4) && (y3 >= y1 && y3 <= y2 && y4 >= y1 && y4 <= y2))) ? true : false;
}
function monster_hit(projectile, monster, damage, hit_image, projectile_hit) {
    if(!monster.invincibility) {
        monster.hp -= damage;
        monster.hit = true;
        damage_text_list.push(new Damage_text(damage, monster.x, monster.y, get_random_value(-3, 3), false));
    }
    if(projectile_hit) hit_image_list.push(new hit_image(projectile.x, projectile.y));
}
function fear(monster) {
    if(q_fear === true) {
        monster.fear_stack += 1;
        if(monster.fear_stack >= Fear_stack_count) {
            monster.hp -= Fear_damage;
            monster.fear_stack = 0;
            hit_image_list.push(new Fear_explosion_image(monster.x, monster.y));
        }
    }
}
function harvestring() {
    if(q_harvestring === true) {
        harvestring_stack += 1;
        if(harvestring_stack >= Harvestring_stack_count) {
            harvestring_stack = 0;
            harvestring_damage += 1;
        }
    }
}
function near_object_search(start_object, list) {
    let min_distance = canvas.width+canvas.height;
    let near_object;
    list.forEach((end_object) => {
        let object_distance = two_point_distance(start_object.x, end_object.x, start_object.y, end_object.y);
        if(min_distance > object_distance) {
            min_distance = object_distance;
            near_object = end_object;
        }
    });
    return near_object;
}
function status_reset() {
    character.level = Level;
    enforce_skill = [0, 0, 0, 0, 0, 0];
    enforce_skill_limit = [0, 0, 0, 0, 0, 0];
    character.exp = 0;
    addition_hp = 0;
    addition_mana = 0;
    for (let i in kill_count_list)
        kill_count_list[i] = 0;
    character.hp = Hp+addition_hp;
    character.mana = Mana+addition_mana;
    hp_bar = new Condition_bar(Condition_ui_x+120, Condition_ui_y+45, Condition_ui_width*0.525, Condition_ui_height*0.2, Hp+addition_hp, character.hp+addition_hp, "rgb(215,48,48)");
    mana_bar = new Condition_bar(Condition_ui_x+120, Condition_ui_y+80, Condition_ui_width*0.525, Condition_ui_height*0.2, Mana+addition_mana, character.mana+addition_mana, "rgb(31, 135, 196)");
}
function come_main() {
    window.location.reload();
}
function exit() {
    window.close();
}
function background_image_change(image, size) {
    document.body.style.backgroundImage = image;
    document.body.style.backgroundSize = size;
}
function vinetting_timer() {
    let vinetting = requestAnimationFrame(vinetting_timer);
    if(start_vignetting == -1) {
        start_vignetting = 0;
        opacity = 0;
    }
    if(start_vignetting < Vignetting_time) {
        start_vignetting++;
        ctx.fillStyle = "black";
        opacity += Vignetting_opacity_amount;
        ctx.globalAlpha = opacity;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    else if(start_vignetting >= Vignetting_time) {
        cancelAnimationFrame(vinetting);
        start_vignetting = -1;
    }
}
function game_start() {
    ctx.globalAlpha = 1;
    background_image_change(Play_background_image, Play_background_size);
    cancelAnimationFrame(animation);
    status_reset(1);
    start_screen = false;
    main_screen = true;
    main_timer();
    if(tutorial === true) {
        character.level = 0;
        main_page = -1;
        tutorial_timer();
    }
}
function set_stage(stage_level) {
    stage = stage_level;
    mode = Stage_mode[stage];
    stage_change_time = game_timer;
    spawn_list = [];
    monster_list = [];
    monster_hp_bar_list = [];
    projectile_list = [];
    object_text = [];
    for (let l of SpawnList[stage]) {
        kill_count_list[l.monster] = 0;
        spawn_list.push(spawn_infor_list[l.monster]);
    }
}
function set_spawn_time(num, time) {
    spawn_infor_list[num][1] = time;
}
function reverse_image(image, x, y, width, height) {
    ctx.translate(x+width, y);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, 0, width, height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function execute_time_out(time, func, ob) {
    let start_time = game_timer;
    function timer() {
        let t = requestAnimationFrame(timer);
        if(game_timer > start_time+time) {
            func(ob);
            cancelAnimationFrame(t);
        }
    };
    timer();
}
function tutorial_miniquest() {
    if(main_page === 0 && sub_page === 4) {
        character.x = 100;
        character.y = Y-character.height/2;
        tutorial_limit = 4;
    }
    else if(main_page === 2 && sub_page === 4) {
        scarecrow_hp = 2;
        monster_list.push(new Scarecrow(X*2-200, Y));
        monster_hp_bar_list.push(new Condition_bar(X*2-200, Y, Scarecrow_width, Monster_hp_bar_height, scarecrow_hp, scarecrow_hp, "red"));
        character.level = 1;
        tutorial_limit = 4;
    }
    else if(main_page === 2 && sub_page === 7) {
        damage_text_list.push(new Damage_text(4, character.x, character.y, get_random_value(-3, 3), true));
        character.hp = 1;
        character.level = 3;
        tutorial_limit = 7;
    }
    else if(main_page === 2 && sub_page === 10) {
        scarecrow_hp = 25;
        monster_list.push(new Scarecrow(X*2-200, Y));
        monster_hp_bar_list.push(new Condition_bar(X*2-200, Y, Scarecrow_width, Monster_hp_bar_height, scarecrow_hp, scarecrow_hp, "red"));
        character.level = 5;
        tutorial_limit = 10;
    }
    else if(main_page === 2 && sub_page === 17) {
        stat_point = 5;
        skill_point = 2;
        tutorial_limit = 17;
    }
    else if(main_page === 3 && sub_page === 7) {
        character.level = 1;
        character.exp = 0;
        kill_count_list[0] = 0;
        tutorial_limit = 7;
    }
    else {
        monster_list = [];
        monster_hp_bar_list = [];
        character.hp = Hp+addition_hp;
        if(sub_page < 16 && main_page === 2) {
            stat_point = 0;
            skill_point = 0;
        }
    }
}
function monster_spawnpoint() {
    //화면 끝 랜덤한 위치에 스폰
    random_num = get_random_value(0, 4)
    let x_point, y_point;
    switch(random_num) {
        case 0:
            x_point = 0;
            y_point = get_random_value(0, canvas.height);
            break;
        case 1:
            x_point = get_random_value(0, canvas.width);
            y_point = 0;
            break;
        case 2:
            x_point = canvas.width;
            y_point = get_random_value(0, canvas.height);
            break;
        case 3:
            x_point = get_random_value(0, canvas.width);
            y_point = canvas.height;
            break;
    }
    return [x_point, y_point];
}

//시작 UI
let myfont = new FontFace("AlexBrush", "url(./font/AlexBrush.ttf)");
let start_ui = {
    draw() {
        myfont.load().then((font) => {  
            document.fonts.add(font)
            ctx.font = "bold "+Start_ui_text_font_size+"px AlexBrush";
            ctx.textAlign = "center";
            ctx.fillStyle = "black"
            ctx.fillText("Magical Travel", Start_ui_text_x+6, Start_ui_text_y+5);
            ctx.fillStyle = Start_ui_text_color;
            ctx.fillText("Magical Travel", Start_ui_text_x, Start_ui_text_y);
        })
        ctx.strokeStyle = "purple";
        ctx.lineJoin = "round";
        ctx.lineWidth = Start_ui_button_corner+start_button_hover_size_01.value*2;
        ctx.strokeRect(Start_ui_text_x-Start_ui_button_width/2-Start_ui_button_stroke_size+(Start_ui_button_corner/2), Start_ui_text_y+Start_ui_button_height/2-Start_ui_button_stroke_size+(Start_ui_button_corner/2), Start_ui_button_width-Start_ui_button_corner+Start_ui_button_stroke_size*2, Start_ui_button_height-Start_ui_button_corner+Start_ui_button_stroke_size*2);
        ctx.strokeStyle = Start_ui_button_color;
        ctx.strokeRect(Start_ui_text_x-Start_ui_button_width/2+(Start_ui_button_corner/2), Start_ui_text_y+Start_ui_button_height/2+(Start_ui_button_corner/2), Start_ui_button_width-Start_ui_button_corner, Start_ui_button_height-Start_ui_button_corner);
        ctx.fillStyle = "purple";
        ctx.font = "bold "+(Start_ui_button_font_size+start_button_hover_size_01.value/2)+"px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Start", Start_ui_text_x, Start_ui_text_y+Start_ui_button_height+20);

        ctx.strokeStyle = "purple";
        ctx.lineWidth = Start_ui_button_corner+start_button_hover_size_02.value*2;
        ctx.strokeRect(Start_ui_text_x-Start_ui_button_width/2-Start_ui_button_stroke_size+(Start_ui_button_corner/2), Start_ui_text_y+Start_ui_button_height*2-Start_ui_button_stroke_size+(Start_ui_button_corner/2), Start_ui_button_width-Start_ui_button_corner+Start_ui_button_stroke_size*2, Start_ui_button_height-Start_ui_button_corner+Start_ui_button_stroke_size*2);
        ctx.strokeStyle = Start_ui_button_color;
        ctx.strokeRect(Start_ui_text_x-Start_ui_button_width/2+(Start_ui_button_corner/2), Start_ui_text_y+Start_ui_button_height*2+(Start_ui_button_corner/2), Start_ui_button_width-Start_ui_button_corner, Start_ui_button_height-Start_ui_button_corner);
        ctx.font = "bold "+(Start_ui_button_font_size+start_button_hover_size_02.value/2)+"px Arial";
        ctx.fillText("Tutorial", Start_ui_text_x, Start_ui_text_y+Start_ui_button_height*2.5+20);
    }
}

//ESC UI
let menu_list = ["메인메뉴로", "종료"];
let menu_count = menu_list.length;
let esc_ui = {
    width : Esc_ui_width,
    height : Esc_ui_height,
    x : X-Esc_ui_width/2,
    y : Y-Esc_ui_height/2,
    draw() {
        ctx.lineJoin = "round";
        ctx.strokeStyle = "black";
        ctx.lineWidth = Esc_line_size;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "rgb(160, 160, 160)";
        //전체 크기
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.lineWidth = Esc_line_size/1.5;
        ctx.strokeStyle = "black";
        for(let i=0; i<menu_count; i++) {
            let interval = (this.height-Esc_ui_menu_height*menu_count)/(menu_count+1)*(i+1)+Esc_ui_menu_height*i;
            let hover_size = esc_button_hover_size[i].value*2;
            ctx.strokeRect(this.x+(this.width-Esc_ui_menu_width)/2-hover_size/2, this.y+interval-hover_size/2, Esc_ui_menu_width+hover_size, Esc_ui_menu_height+hover_size);
            ctx.fillStyle = "white";
            ctx.fillRect(this.x+(this.width-Esc_ui_menu_width)/2-hover_size/2, this.y+interval-hover_size/2, Esc_ui_menu_width+hover_size, Esc_ui_menu_height+hover_size);
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.font = "bold "+(Esc_ui_menu_font_size+esc_button_hover_size[i].value/2)+"px 맑은고딕";
            ctx.fillText(menu_list[i], this.x+(this.width-Esc_ui_menu_width)/2+Esc_ui_menu_width/2, this.y+interval+Esc_ui_menu_height/1.5, Esc_ui_menu_width, Esc_ui_menu_height);
        }
    }
}

//튜토리얼 UI
let tutorial_text = ["기본조작법", "상태창/메뉴", "스킬/스텟", "전투"];
let sub_tutorial_text = [
    ["기본조작법 튜토리얼을 시작하겠습니다.",
    "'W','A','S','D' 키를 통해 이동할 수 있습니다.",
    "또한 'Space'를 통해 바라보는 방향으로 순간이동이 가능합니다.",
    Space_skill_cooldown+"초의 쿨타임이 존재한다는 점도 기억해주세요!",
    "이해하셨다면 녹색 목표지점으로 이동해볼까요?",
    "잘하셨어요!",
    "이것으로 기본조작법 튜토리얼을 마치도록 하겠습니다."
    ],
    ["상태창/메뉴 튜토리얼을 시작하겠습니다.",
    "화면의 왼쪽 아래에는 자신의 레벨, 체력, 마나, 경험치가 표시됩니다.",
    "오른쪽 아래에는 스킬의 쿨타임, 키, 사용가능 여부가 표시됩니다.",
    "'Esc' 키를 누르면 일시정지가 가능합니다.",
    "또한 시작메뉴로 돌아갈때도 'Esc' 키를 통해 돌아갈 수 있습니다.",
    "이것으로 상태창/메뉴 튜토리얼을 마치도록 하겠습니다.",
    ],
    ["스킬/스텟 튜토리얼을 시작하겠습니다.",
    "'Q','E','R' 키를 통해 스킬을 사용할 수 있습니다.",
    "스킬은 각각 1레벨, 3레벨, 5레벨에 도달하면 해금됩니다.",
    "Q스킬은 바라보는 방향에 어둠 불꽃을 날려 데미지를 입히는 스킬입니다.",
    "Q스킬을 사용하여 허수아비를 처치해볼까요?",
    "잘하셨어요!",
    "E스킬은 일정 수치만큼 체력을 회복하는 스킬입니다.",
    "E스킬을 사용하여 체력을 회복해볼까요?",
    "잘하셨어요!",
    "R스킬은 바라보는 방향에 폭풍우를 소환하여 데미지를 입히는 스킬입니다.",
    "R스킬을 사용하여 허수아비를 처치해볼까요?",
    "잘하셨어요!",
    "레벨이 1 오를 때마다 '스텟포인트'를 1개 얻습니다.",
    "그리고 레벨이 2 오를 때마다 '스킬포인트'를 1개 얻습니다.",
    "해당 포인트는 'T'키를 통해 강화할 수 있습니다.",
    "또한 스킬 아이콘을 클릭하면 강화 상세 정보를 표기해줍니다.",
    "다시 'T'키를 누르면 저장되며, 이때 사용된 포인트는 반환이 불가능합니다.",
    "포인트를 사용하여 스킬과 스텟을 강화해볼까요?",
    "잘하셨어요!",
    "이것으로 스킬/스텟 튜토리얼을 마치도록 하겠습니다."
    ],
    ["전투 튜토리얼을 시작하겠습니다.",
    "전투는 화면의 끝에서 적들이 몰려오는 형식으로 진행됩니다.",
    "적 또는 적이 날리는 투사체와 충돌하면 데미지를 입습니다.",
    "체력이 모두 소진되면, 해당 스테이지부터 다시 시작할 수 있습니다.",
    "화면의 오른쪽 위에는 해당 스테이지의 목표가 표시됩니다.",
    "목표는 스테이지에 따라 다르며, 여러개가 존재할 수 있습니다.",
    "해당 스테이지의 모든 목표를 달성하면 다음 스테이지로 넘어갈 수 있습니다.",
    "그렇다면 간단한 목표를 달성해볼까요?",
    "잘하셨어요!",
    "이것으로 전투 튜토리얼을 마치도록 하겠습니다."
    ]];
let main_page, sub_page, tutorial_main = true, tutorial_limit, scarecrow_hp;
let tutorial_ui = {
    draw() {
        ctx.strokeStyle = "black";
        ctx.lineJoin = "round";
        ctx.lineWidth = Tutorial_ui_button_corner;
        ctx.beginPath();
        ctx.strokeRect(Tutorial_ui_text_x-Tutorial_ui_button_width/2-Tutorial_ui_button_stroke_size+(Tutorial_ui_button_corner/2), Tutorial_ui_text_y+Tutorial_ui_button_height*2-Tutorial_ui_button_stroke_size+(Tutorial_ui_button_corner/2), Tutorial_ui_button_width-Tutorial_ui_button_corner+Tutorial_ui_button_stroke_size*2, Tutorial_ui_button_height-Tutorial_ui_button_corner+Tutorial_ui_button_stroke_size*2);
        ctx.strokeStyle = Tutorial_ui_button_color;
        ctx.strokeRect(Tutorial_ui_text_x-Tutorial_ui_button_width/2+(Tutorial_ui_button_corner/2), Tutorial_ui_text_y+Tutorial_ui_button_height*2+(Tutorial_ui_button_corner/2), Tutorial_ui_button_width-Tutorial_ui_button_corner, Tutorial_ui_button_height-Tutorial_ui_button_corner);
        ctx.fillStyle = "black";
        ctx.font = "bold "+(Tutorial_ui_button_font_size)+"px '나눔고딕'";
        ctx.textAlign = "center";
        if(tutorial_main === true) {
            ctx.font = "bold "+(Tutorial_ui_button_font_size)+"px '나눔고딕'";
            if(main_page === -1)
                ctx.fillText("'<'키와 '>'키를 통해 원하시는 항목을 선택하고 'Enter'를 누르세요!", Tutorial_ui_text_x, Tutorial_ui_text_y+Tutorial_ui_button_height*2.5+10);
            else
                ctx.fillText(tutorial_text[main_page], Tutorial_ui_text_x, Tutorial_ui_text_y+Tutorial_ui_button_height*2.5+10);
        }
        else {
            ctx.font = (Tutorial_ui_button_font_size)+"px '나눔고딕'";
            ctx.fillText(sub_tutorial_text[main_page][sub_page], Tutorial_ui_text_x, Tutorial_ui_text_y+Tutorial_ui_button_height*2.5+10);
        }
    }
}
let tutorial_object = {
    width : 200,
    height : 100,
    x : X*2-200,
    y : Y,
    draw() {
        ctx.drawImage(img[33], this.x, this.y, this.width, this.height);
    }
}

//메인 캐릭터
let character = {
    width : Character_width,
    height : Character_height,
    x : X-Character_width/2,
    y : Y-Character_height/2,
    hp : Hp,
    mana : Mana,
    level : Level,
    exp : 0,
    draw() {
        //ctx.fillStyle = "black";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        if(chr_image_change%2 === 0)
            ctx.drawImage(img[direction*2], this.x, this.y, this.width, this.height);
        else
            ctx.drawImage(img[direction*2+1], this.x, this.y, this.width, this.height);
    }
}

//UI
let condition_ui = {
    draw() {
        ctx.drawImage(img[22], Condition_ui_x, Condition_ui_y, Condition_ui_width, Condition_ui_height);
    }
}
class Condition_bar {
    constructor(x, y, width, height, max, progress, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.max = max;
        this.progress = progress;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width/this.max*this.progress, this.height);
    }
}
class Skill_ui {
    constructor(x, num) {
        this.x = x;
        this.num = num;
    }
    draw() {
        ctx.drawImage(img[23+this.num], this.x, Skill_ui_y, Skill_ui_size, Skill_ui_size);
    }
}
class Skill_key_ui {
    constructor(x, n) {
        this.x = x;
        this.n = n;
    }
    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, Skill_key_ui_y, Skill_key_ui_width, Skill_key_ui_height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, Skill_key_ui_y, Skill_key_ui_width, Skill_key_ui_height);
        ctx.font = "bold "+Skill_key_ui_font_size+"px '맑은고딕'";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        if(this.n === 0)
            ctx.fillText("Space", this.x+30, Skill_key_ui_y+11);
        else if(this.n === 1)
            ctx.fillText("Q", this.x+30, Skill_key_ui_y+11);
        else if(this.n === 2)
            ctx.fillText("E", this.x+30, Skill_key_ui_y+11);
        else if(this.n === 3)
            ctx.fillText("R", this.x+30, Skill_key_ui_y+11);
    }
}
class Cooldown_bar {
    constructor(x, n) {
        this.x = x;
        this.start = -90*(Math.PI/180);
        this.n = n;
    }
    draw_background() {
        //바깥쪽
        ctx.beginPath();
        ctx.fillStyle = Cooldown_ui_background_color;
        ctx.arc(this.x, Cooldown_ui_y, Cooldown_ui_radius+1, Math.PI*2, false);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();
        //안쪽
        ctx.beginPath();
        ctx.moveTo(this.x, Cooldown_ui_y);
        ctx.arc(this.x, Cooldown_ui_y, Cooldown_ui_radius, this.start, (360-(cooldown_list[this.n][0]*(360/cooldown_list[this.n][1])))*(Math.PI/180)+this.start);
        ctx.closePath();
        ctx.fillStyle = Cooldown_ui_color;
        ctx.fill();
    }
    draw_impossible() {
        ctx.beginPath();
        ctx.arc(this.x, Cooldown_ui_y, Cooldown_ui_radius+1, Math.PI*2, false);
        ctx.fillStyle = Cooldown_ui_impossible_color;
        ctx.fill();
    }
}
let level = {
    draw() {
        ctx.textAlign = "left";
        ctx.font = "bold "+Level_font_size+"px '맑은고딕'";
        ctx.fillStyle = Level_color;
        ctx.fillText("Level: " + character.level, Level_x, Level_y);
    }
}
let enforce_ui_interval = (Enforce_ui_height-Enforce_ui_height/Enforce_ui_skill_area_y*3)/4;
let enforce_ui = {
    width : Enforce_ui_width,
    height : Enforce_ui_height,
    x : X-Enforce_ui_width/2,
    y : Y-Enforce_ui_height/2-50,
    draw() {
        ctx.lineJoin = "round";
        ctx.strokeStyle ="black";
        ctx.lineWidth = Enforce_ui_line_size;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "rgb(160, 160, 160)";
        //전체 크기
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //설명창 크기
        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.x+this.width/2, this.y+enforce_ui_interval, this.width/2.25, this.height-enforce_ui_interval*2);
        ctx.lineWidth = 5;
        ctx.strokeRect(this.x+this.width/2, this.y+enforce_ui_interval*2, this.width/2.25, this.height-enforce_ui_interval*3);
        ctx.strokeRect(this.x+this.width/2, this.y+enforce_ui_interval, this.width/2.25, enforce_ui_interval);
        ctx.textAlign = "left";
        let count = 0;
        for(let i=0; i<3; i++) {
            for(let j=0; j<2; j++) {
                //강화 칸 크기
                ctx.fillStyle = "rgb(130, 130, 130)";
                ctx.fillRect(this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x-this.width/Enforce_ui_skill_area_x/2, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval, this.width/Enforce_ui_skill_area_x+this.width/Enforce_ui_skill_area_x/2, this.height/Enforce_ui_skill_area_y);
                if(count < 2) {
                    ctx.strokeStyle = (count === enforce_count) ? "lime" : "green";
                    ctx.strokeRect(this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x+2, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval+2, this.width/Enforce_ui_skill_area_x-4, this.height/Enforce_ui_skill_area_y-4);
                    ctx.drawImage(img[35+count], this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval, this.width/Enforce_ui_skill_area_x, this.height/Enforce_ui_skill_area_y);
                }    
                else {
                    ctx.strokeStyle = (count === enforce_count) ? "rgb(204, 51, 204)" : "purple";
                    ctx.strokeRect(this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x+2, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval+2, this.width/Enforce_ui_skill_area_x-4, this.height/Enforce_ui_skill_area_y-4);
                    ctx.drawImage(img[21+count], this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval, this.width/Enforce_ui_skill_area_x, this.height/Enforce_ui_skill_area_y);
                }
                ctx.strokeStyle = "black";
                ctx.fillStyle = Enforce_impossible_color;
                //Enforce icon
                ctx.strokeRect(this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval, this.width/Enforce_ui_skill_area_x, this.height/Enforce_ui_skill_area_y);
                //Enforce up
                ctx.strokeRect(this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x-this.width/Enforce_ui_skill_area_x/2, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval, this.width/Enforce_ui_skill_area_x/2, this.height/Enforce_ui_skill_area_y/2);
                ctx.drawImage(img[37], this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x-this.width/Enforce_ui_skill_area_x/2, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval, this.width/Enforce_ui_skill_area_x/2, this.height/Enforce_ui_skill_area_y/2);
                if(stat_point === 0 && count < 2)
                    ctx.fillRect(this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x-this.width/Enforce_ui_skill_area_x/2, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval, this.width/Enforce_ui_skill_area_x/2, this.height/Enforce_ui_skill_area_y/2)
                else if((skill_point === 0 && 2 <= count) || (enforce_skill[count] >= enforce_skill_length[count-2]))
                    ctx.fillRect(this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x-this.width/Enforce_ui_skill_area_x/2, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval, this.width/Enforce_ui_skill_area_x/2, this.height/Enforce_ui_skill_area_y/2)
                //Enforce down
                ctx.strokeRect(this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x-this.width/Enforce_ui_skill_area_x/2, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval+this.height/Enforce_ui_skill_area_y/2, this.width/Enforce_ui_skill_area_x/2, this.height/Enforce_ui_skill_area_y/2);
                ctx.drawImage(img[38], this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x-this.width/Enforce_ui_skill_area_x/2, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval+this.height/Enforce_ui_skill_area_y/2, this.width/Enforce_ui_skill_area_x/2, this.height/Enforce_ui_skill_area_y/2);
                if(enforce_skill_limit[count] === enforce_skill[count])
                    ctx.fillRect(this.x+j*(this.width/Enforce_ui_skill_area_x*2)+this.width/Enforce_ui_skill_area_x-this.width/Enforce_ui_skill_area_x/2, this.y+i*(this.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval+this.height/Enforce_ui_skill_area_y/2, this.width/Enforce_ui_skill_area_x/2, this.height/Enforce_ui_skill_area_y/2)
                count++;
            }
        }
        //텍스트
        ctx.fillStyle = "black";
        ctx.font = Enforce_ui_font_size+"px '맑은고딕'";
        ctx.fillText("스텟포인트: "+stat_point, this.x+this.width/2+10, this.y+enforce_ui_interval*1.7);
        ctx.fillText("스킬포인트: "+skill_point, this.x+this.width/2+this.width/5.5, this.y+enforce_ui_interval*1.7);
    }
}

//목표
let object_text = [];
function kill_monster_object_text(name, cur_count, success_count) {
    return name+" "+success_count+"마리 처치 ("+cur_count+"/"+success_count+")";
}
function check_kill_count(num, success_count) {
    return (kill_count_list[num] >= success_count) ? true : false;
}
function survival_object_text(time) {
    return time+"초 생존";
}
function renewal_object(index, texts) {
    object_text[index] = texts;
}
let object_ui = {
    width : Object_ui_width,
    height : Object_ui_height,
    x : Object_ui_x,
    y : Object_ui_y,
    draw() {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.fillStyle = "white";
        let len = object_text.length;
        ctx.strokeRect(this.x, this.y, this.width, this.height*len+Object_ui_interval);
        ctx.fillRect(this.x, this.y, this.width, this.height*len+Object_ui_interval);
        ctx.textAlign = "center";
        ctx.font = Object_ui_font_size+"px '맑은고딕'";
        for(let i=0; i<len; i++) {
            ctx.fillStyle = (check_kill_count(SpawnList[stage][i].monster, SpawnList[stage][i].objectCount) && Stage_mode[stage] == Battle) ? "lime" : "black";
            ctx.fillText(object_text[i], this.x+this.width/2, this.y+this.height/2+i*(Object_ui_font_size+Object_ui_interval)+6+Object_ui_interval/2);
        }
    }
}

//레벨업
let level_up = {
    draw(x, y) {
        ctx.font = "bold "+Level_up_font_size+"px '맑은고딕'";
        ctx.fillStyle = Level_up_color;
        ctx.fillText("Level Up!", x, y);
    }
}

//스킬
class Portal {
    constructor(x, y, direc) {
        this.x = x;
        this.y = y;
        this.direc = direc;
        this.timer = 0;
    }
    draw() {
        ctx.drawImage((this.direc === 0 || this.direc === 2) ? img[8] : img[9], this.x, this.y, Portal_size, Portal_size);
    }
}
class Teleport_projectile {
    constructor(x, y) {
        this.width = Teleport_projectile_size;
        this.height = Teleport_projectile_size;
        this.x = x;
        this.y = y;
        this.speed = Teleport_projectile_speed;
        this.distance = 0;
    }
    draw() {
        ctx.drawImage(img[39], this.x, this.y, this.width, this.height);
    }
}
class Teleport_projectile_hit_image {
    constructor(x, y) {
        this.width = Teleport_projectile_hit_size;
        this.height = Teleport_projectile_hit_size;
        this.x = x;
        this.y = y;
        this.timer = 0;
    }
    draw() {
        ctx.drawImage(img[40], this.x, this.y, this.width, this.height);
    }
}
class Darkness_flame {
    constructor(x, y, direc) {
        this.width = Flame_size;
        this.height = Flame_size;
        this.x = x;
        this.y = y;
        this.direc = direc;
        this.timer = 0;
        this.image_change = 0;
        this.hit_monster = [];
    }
    draw() {
        //ctx.fillStyle = "red";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage((this.image_change%2 === 0) ? img[this.direc*2 + 10] : img[this.direc*2 + 11], this.x, this.y, this.width, this.height);
    }
}
class Darkness_flame_hit_image {
    constructor(x, y) {
        this.width = Flame_hit_size;
        this.height = Flame_hit_size;
        this.x = x;
        this.y = y;
        this.timer = 0;
    }
    draw() {
        ctx.drawImage(img[18], this.x, this.y, this.width, this.height);
    }
}
class Fear_explosion_image {
    constructor(x, y) {
        this.width = Fear_explosion_size;
        this.height = Fear_explosion_size;
        this.x = x;
        this.y = y;
        this.timer = 0;
    }
    draw() {
        ctx.drawImage(img[41], this.x, this.y, this.width, this.height);
    }
}
let dead_whisper = {
    draw(n, y) {
        ctx.drawImage(img[27+n], character.x-20, character.y+70+y, Dead_whisper_size, Dead_whisper_size);
    }
}
class Hp_steal_projectile {
    constructor(x, y) {
        this.width = Hp_steal_projectile_size;
        this.height = Hp_steal_projectile_size;
        this.x = x;
        this.y = y;
        this.speed = Hp_steal_projectile_speed;
        this.distance = 0;
    }
    draw() {
        ctx.drawImage(img[42], this.x, this.y, this.width, this.height);
    }
}
class Hp_steal_projectile_hit_image {
    constructor(x, y) {
        this.width = Hp_steal_projectile_hit_size;
        this.height = Hp_steal_projectile_hit_size;
        this.x = x;
        this.y = y;
        this.timer = 0;
    }
    draw() {
        ctx.drawImage(img[43], this.x, this.y, this.width, this.height);
    }
}
class Soul {
    constructor(x, y, random_x, random_y) {
        this.width = Soul_width;
        this.height = Soul_height;
        this.x = x+random_x;
        this.y = y+random_y;
        this.speed = Soul_speed;
        this.distance = 0;
    }
    draw() {
        ctx.drawImage(img[44], this.x, this.y, this.width, this.height);
    }
}
class Black_storm_cloud {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        ctx.drawImage(img[30], this.x, this.y, Black_storm_cloud_width, Black_storm_cloud_height);
    }
}
class Black_storm_range {
    constructor(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
    draw() {
        //ctx.fillStyle = "black";
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
let black_storm_thunder = {
    draw(x, y, n) {
        ctx.drawImage(img[31+n], x, y, Black_storm_thunder_width, Black_storm_thunder_height);
    }
}
class Shoke_image {
    constructor(x, y, width, height, n) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.n = n;
    }
    draw() {
        ctx.drawImage(img[45+this.n], this.x, this.y, this.width, this.height);
    }
}

//몬스터
class Monster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.number = 0;
        this.speed_reduce = 0;
        this.timer = 0, this.image_change = 0;
        this.distance = 0;
        this.attack = false, this.attack_timer = 0;
        this.ranged = false;
        this.hit = false, this.hit_timer = 0;
        this.hit_image_change = false;
        this.image_change_ability = true;
        this.collision_damage = true;
        this.fear_stack = 0;
        this.r_slow_time = 0;
        this.shoke_time = 0;
        this.invincibility = false;
    }
    draw() {
        let image = (this.hit_image_change === true) ? monster_img[this.number][2] : (this.image_change%2 === 0) ? monster_img[this.number][0] : monster_img[this.number][1];
        if(character.x > this.x)
            ctx.drawImage(image, this.x, this.y, this.width, this.height);
        else
            reverse_image(image, this.x, this.y, this.width, this.height)
    }
    ability() {}
    death_ability() {}
}
class Ranged_monster extends Monster {
    constructor(x, y) {
        super(x, y);
        this.attack_speed;
        this.attack_damage;
        this.projectile_speed;
        this.projectile;
        this.ranged = true;
        this.collision_damage = false;
        this.stop = false;
        this.stop_timer = 0;
        this.ability_timer = -1;
    }
    ability() {
        if(!this.stop) this.ability_timer = 0;
        else if(0 <= this.ability_timer) {
            if(++this.ability_timer%this.attack_speed === 0) {
                let dis = two_point_distance(this.x, character.x, this.y, character.y);
                let x_speed = (character.x-this.x) / (dis/this.projectile_speed);
                let y_speed = (character.y-this.y) / (dis/this.projectile_speed);
                projectile_list.push(new this.projectile(this.x, this.y, this.attack_damage, x_speed, y_speed));
            }
        }
    }
}
class Boss_monster extends Monster {
    constructor(x, y) {
        super(x, y);
        this.isSpawned = false;
    }
}
let projectile_list = [];
class Ranged_monster_projectile {
    constructor(x, y, damage, x_speed, y_speed) {
        this.number = 0;
        this.x = x;
        this.y = y;
        this.distance = 0;
        this.x_speed = x_speed;
        this.y_speed = y_speed;
        this.damage = damage;
    }
    draw() {
        ctx.drawImage(monster_img[this.number][3], this.x, this.y, this.width, this.height);
    }
    ability() {}
}
class Scarecrow extends Monster {
    constructor(x, y) {
        super(x, y);
        this.speed = 0;
        this.hp = scarecrow_hp;
        this.width = Scarecrow_width;
        this.height = Scarecrow_height;
        this.exp = 0;
        this.image_change_ability = false;
        this.collision_damage = false;
    }
    draw() {
        ctx.drawImage(img[34], this.x, this.y, this.width, this.height);
    }
}
class Slime extends Monster {
    constructor(x, y) {
        super(x, y);
        this.number = 0;
        this.hp = Slime_hp;
        this.damage = Slime_damage;
        this.speed = Slime_speed, this.default_speed = Slime_speed;
        this.width = Slime_width;
        this.height = Slime_height;
        this.exp = Slime_exp;
    }
}
class Bugs extends Monster {
    constructor(x, y) {
        super(x, y)
        this.number = 1;
        this.hp = Bugs_hp;
        this.damage = Bugs_damage;
        this.speed = Bugs_speed, this.default_speed = Bugs_speed;
        this.width = Bugs_width;
        this.height = Bugs_height;
        this.exp = Bugs_exp;
    }
    ability() {
        if(this.hit) {
            this.default_speed = Bugs_speed+2
            execute_time_out(Bugs_speed_up_time, this.ability_func, this);
        }
    }
    ability_func(monster) {
        monster.default_speed = Bugs_speed;
    }
}
class Crow extends Ranged_monster {
    constructor(x, y) {
        super(x, y);
        this.number = 2;
        this.hp = Crow_hp;
        this.speed = Crow_speed, this.default_speed = Crow_speed;
        this.width = Crow_width;
        this.height = Crow_height;
        this.exp = Crow_exp;
        this.attack_speed = Crow_attack_speed;
        this.attack_damage = Crow_attack_damage;
        this.projectile_speed = Crow_projectile_speed;
        this.projectile = Crow_projectile;
    }
}
class Crow_projectile extends Ranged_monster_projectile {
    constructor(x, y, damage, x_speed, y_speed) {
        super(x, y, damage, x_speed, y_speed);
        this.number = 2;
        this.width = Crow_projectile_width;
        this.height = Crow_projectile_height;
    }
}
class WildBoar extends Monster {
    constructor(x, y) {
        super(x, y);
        this.number = 3;
        this.hp = WildBoar_hp;
        this.damage = WildBoar_damage;
        this.speed = WildBoar_speed, this.default_speed = WildBoar_speed;
        this.width = WildBoar_width;
        this.height = WildBoar_height;
        this.exp = WildBoar_exp;
        this.ability_timer = game_timer;
        this.ability_used = false;
    }
    ability() {
        if(!this.ability_used && game_timer >= this.ability_timer+WildBoar_speed_up_time) {
            this.default_speed -= WildBoar_ability_speed_reduce;
            this.ability_used = true;
            this.damage -= WildBoar_ability_damage_reduce;
        }
    }
}
class Tar extends Ranged_monster {
    constructor(x, y) {
        super(x, y);
        this.number = 4;
        this.hp = Tar_hp;
        this.speed = Tar_speed, this.default_speed = Tar_speed;
        this.width = Tar_width;
        this.height = Tar_height;
        this.exp = Tar_exp;
        this.attack_speed = Tar_attack_speed;
        this.attack_damage = Tar_attack_damage;
        this.projectile_speed = Tar_projectile_speed;
        this.projectile = Tar_projectile;
    }
}
class Tar_projectile extends Ranged_monster_projectile {
    constructor(x, y, damage, x_speed, y_speed) {
        super(x, y, damage, x_speed, y_speed);
        this.number = 4;
        this.width = Tar_projectile_width;
        this.height = Tar_projectile_height;
    }
    ability() {
        increase_speed -= Tar_projectile_slow_amount;
        execute_time_out(Tar_projectile_slow_time, this.ability_func, this);
    }
    ability_func(_monster) {
        increase_speed += Tar_projectile_slow_amount;
    }
}
class ShadowWolf extends Monster {
    constructor(x, y) {
        super(x, y);
        this.number = 5;
        this.hp = ShadowWolf_hp;
        this.damage = ShadowWolf_damage;
        this.speed = ShadowWolf_speed, this.default_speed = ShadowWolf_speed;
        this.width = ShadowWolf_width;
        this.height = ShadowWolf_height;
        this.exp = ShadowWolf_exp;
    }
    ability() {
        if(character.hp <= (Hp+addition_hp)*ShadowWolf_ability_magnification) {
            this.damage = ShadowWolf_damage+2;
            this.default_speed = ShadowWolf_speed+1; 
        }
        else {
            this.damage = ShadowWolf_damage;
            this.default_speed = ShadowWolf_speed;
        }
    }
}
class Floower extends Monster {
    constructor(x, y) {
        super(x, y);
        this.number = 6;
        this.hp = Floower_hp;
        this.damage = Floower_damage;
        this.speed = Floower_speed, this.default_speed = Floower_speed;
        this.width = Floower_width;
        this.height = Floower_height;
        this.exp = Floower_exp;
    }
    death_ability() {
        for (let i = 0; i < Floower_summonCount; i++) {
            monster_x = this.x+get_random_value(-50, 50);
            monster_y = this.y+get_random_value(-50, 50);
            monster_list.push(new WitheredFlower(monster_x, monster_y));
            monster_hp_bar_list.push(new Condition_bar(monster_x, monster_y, WitheredFlower_width, Monster_hp_bar_height, WitheredFlower_hp, WitheredFlower_hp, "red"));
        }
    }
}
class WitheredFlower extends Monster {
    constructor(x, y) {
        super(x, y);
        this.number = 7;
        this.hp = WitheredFlower_hp;
        this.damage = WitheredFlower_damage;
        this.speed = WitheredFlower_speed, this.default_speed = WitheredFlower_speed;
        this.width = WitheredFlower_width;
        this.height = WitheredFlower_height;
        this.exp = WitheredFlower_exp;
    }
}
class ManEatingFlower extends Boss_monster {
    constructor(x, y) {
        super(x, y);
        this.number = 8;
        this.hp = ManEatingFlower_hp;
        this.damage = ManEatingFlower_damage;
        this.speed = ManEatingFlower_speed, this.default_speed = ManEatingFlower_speed;
        this.width = ManEatingFlower_width;
        this.height = ManEatingFlower_height;
        this.exp = ManEatingFlower_exp;
        this.skill1_cooldown = 0;
        this.skill2_cooldown = 0;
        this.passive_used = false;
    }
    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    ability() {
        this.skill1_cooldown++;
        this.skill2_cooldown++;
        if(this.skill1_cooldown%(60*ManEatingFlower_skill1_cooldown) === 0) {
            this.skill1_cooldown = 0;
            this.ability_func1();
        }
        if(this.skill2_cooldown%(60*ManEatingFlower_skill2_cooldown) === 0) {
            this.skill2_cooldown = 0;
            this.damage = ManEatingFlower_skill2_damage;
            this.default_speed = ManEatingFlower_skill2_speed;
            execute_time_out(ManEatingFlower_skill2_time, this.ability_func2, this);
        }
        if(this.hp <= ManEatingFlower_hp/2 && !this.passive_used) {
            this.invincibility = true;
            let summon_count = [2, 3];
            let summon_monster = [Floower, Tar];
            for (let i = 0; i < summon_monster.length; i++) {
                for (let j = 0; j < summon_count[i]; j++) {
                    [monster_x, monster_y] = monster_spawnpoint();
                    let ob = new summon_monster[i](monster_x, monster_y);
                    monster_list.push(ob);
                    monster_hp_bar_list.push(new Condition_bar(monster_x, monster_y, ob.width, Monster_hp_bar_height, ob.hp, ob.hp, "red"));
                }
            }
            this.passive_used = true;
        }
        if(monster_list.length === 1 && this.passive_used) this.invincibility = false;
    }
    ability_func1() {
        for(let i = 0; i < ManEatingFlower_skill1_count; i++) {
            let x = get_random_value(0, canvas.width);
            let y = get_random_value(0, canvas.height);
            zone_list.push(new WarningZone(x, y, WarningZone_width, WarningZone_height, WarningZone_duration, ManEatingFlower_skill1_damage));
        }
    }
    ability_func2(monster) {
        monster.damage = ManEatingFlower_damage;
        monster.default_speed = ManEatingFlower_speed;
    }
}
let zone_list = [];
class WarningZone {
    constructor(x, y, width, height, duration, damage) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.duration = duration;
        this.damage = damage;
        this.time = 0;
    }
    draw() {
        if(this.time++ > this.duration) {
            if(collision(this, character) || collision(character, this)) {
                character.hp -= this.damage;
                damage_text_list.push(new Damage_text(this.damage, character.x, character.y, get_random_value(-3, 3), true));
            }
            for (let i = 0; i < zone_list.length; i++) {
                if(zone_list[i].time > zone_list[i].duration) {
                    zone_list.splice(i--, 1);
                    return false;
                }
            }
        }
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        return true;
    }
}
class Ray extends Monster {
    constructor(x, y) {
        super(x, y);
        this.number = 9;
        this.hp = Ray_hp;
        this.damage = Ray_damage;
        this.speed = Ray_speed, this.default_speed = Ray_speed;
        this.width = Ray_width;
        this.height = Ray_height;
        this.exp = Ray_exp;
        this.passive_used = false;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    ability() {
        if(this.hp <= 0 && !this.passive_used) {
            this.hp = 1;
            this.default_speed += 2;
            this.passive_used = true;
        }
    }
}
class Jellyfish extends Monster {
    constructor(x, y) {
        super(x, y);
        this.number = 10;
        this.hp = Jellyfish_hp;
        this.damage = Jellyfish_damage;
        this.speed = Jellyfish_speed, this.default_speed = Jellyfish_speed;
        this.width = Jellyfish_width;
        this.height = Jellyfish_height;
        this.exp = Jellyfish_exp;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    ability() {
        if(this.hit) {
            zone_list.push(new PoisonZone(this.x, this.y, PoisonZone_width, PoisonZone_height));
        }
    }
}
class PoisonZone {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.time = 0;
        this.damaged = false;
    }
    draw() {
        if((collision(this, character) || collision(character, this)) && !this.damaged) {
            character.hp -= PoisonZone_damage;
            this.damaged = true;
            damage_text_list.push(new Damage_text(PoisonZone_damage, character.x, character.y, get_random_value(-3, 3), true));
            execute_time_out(PoisonZone_delaytime, this.ability_func, this);
        }
        if(this.time++ > PoisonZone_duration) {
            zone_list.shift();
            return false;
        }
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1;
        return true;
    }
    ability_func(object) {
        object.damaged = false;
    }
}
class Octopus extends Ranged_monster {
    constructor(x, y) {
        super(x, y);
        this.number = 11;
        this.hp = Octopus_hp;
        this.speed = Octopus_speed, this.default_speed = Octopus_speed;
        this.width = Octopus_width;
        this.height = Octopus_height;
        this.exp = Octopus_exp;
        this.attack_speed = Octopus_attack_speed;
        this.attack_damage = Octopus_attack_damage;
        this.projectile_speed = Octopus_projectile_speed;
        this.projectile = Octopus_projectile;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Octopus_projectile extends Ranged_monster_projectile {
    constructor(x, y, damage, x_speed, y_speed) {
        super(x, y, damage, x_speed, y_speed);
        this.width = Octopus_projectile_width;
        this.height = Octopus_projectile_height;
    }
    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    ability() {
        vinetting_timer();
    }
}
class SeaMonster extends Boss_monster {
    constructor(x, y) {
        super(x, y);
        this.number = 12;
        this.hp = SeaMonster_hp;
        this.damage = SeaMonster_damage;
        this.speed = SeaMonster_speed, this.default_speed = SeaMonster_speed;
        this.width = SeaMonster_width;
        this.height = SeaMonster_height;
        this.exp = SeaMonster_exp;
        this.skill1_cooldown = 0;
        this.skill2_cooldown = 0;
        this.skill3_cooldown = 0;
        this.skill1_using = false;
        this.projectile_speed = WaterDrop_projectile_speed;
        this.projectile = WaterDrop;
    }
    draw() {
        if(!this.skill1_using) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    ability() {
        if(!this.skill1_using) {
            this.skill1_cooldown++;
            this.skill3_cooldown++;
        }
        this.skill2_cooldown++;
        if(this.skill1_cooldown%(60*SeaMonster_skill1_cooldown) === 0) {
            this.skill1_cooldown = 1;
            this.skill1_using = true;
            this.collision_damage = false;
            this.damage = 20;
            this.x = character.x;
            this.y = character.y;
            zone_list.push(new WarningZone(character.x, character.y, this.width, this.height, SeaMonster_skill1_time, 0));
            execute_time_out(SeaMonster_skill1_time, this.ability_func1, this);
        }
        if(this.skill2_cooldown%(60*SeaMonster_skill2_cooldown) === 0) {
            this.skill2_cooldown = 0;
            if(get_random_value(0, 2) === 0)
                zone_list.push(new WarningZone(0, get_random_value(0, canvas.height), canvas.width, SeaMonster_skill2_size, SeaMonster_skill2_duration, SeaMonster_skill2_damage));
            else
                zone_list.push(new WarningZone(get_random_value(0, canvas.width), 0, SeaMonster_skill2_size, canvas.height, SeaMonster_skill2_duration, SeaMonster_skill2_damage));
        }
        if(this.skill3_cooldown%(60*SeaMonster_skill3_cooldown) === 0) {
            this.skill3_cooldown = 0;
            for (let i = 0; i < 30; i++) {
                execute_time_out(i, this.ability_func2, this);
            }
        }
    }
    ability_func1(monster) {
        monster.skill1_using = false;
        monster.collision_damage = true;
        execute_time_out(1, (monster) => {
            monster.damage = SeaMonster_damage;
        }, monster);
    }
    ability_func2(monster) {
        let randX = get_random_value(-canvas.width, canvas.width);
        let randY = get_random_value(-canvas.height, canvas.height);
        let dis = two_point_distance(monster.x, randX, monster.y, randY);
        let x_speed = (randX-monster.x) / (dis/monster.projectile_speed);
        let y_speed = (randY-monster.y) / (dis/monster.projectile_speed);
        projectile_list.push(new monster.projectile(monster.x, monster.y, WaterDropDamage, x_speed, y_speed));
    }
}
class WaterDrop extends Ranged_monster_projectile {
    constructor(x, y, damage, x_speed, y_speed) {
        super(x, y, damage, x_speed, y_speed);
        this.width = SeaMonster_projectile_width;
        this.height = SeaMonster_projectile_height;
    }
    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    ability() {
        increase_speed -= WaterDrop_slow_amount;
        execute_time_out(WaterDrop_slow_time, this.ability_func, this);
    }
    ability_func(_monster) {
        increase_speed += WaterDrop_slow_amount;
    }
}

//데미지 표시 텍스트
class Damage_text {
    constructor(damage, x, y, random_x, player) {
        this.player = player;
        this.damage = damage;
        this.x = x;
        this.y = y;
        this.random_x = random_x;
        this.gravity = Damage_text_gravity;
        this.timer = 0;
    }
    draw() {
        ctx.font = "bold "+Damage_text_font_size+"px '맑은고딕'";
        ctx.fillStyle = (this.player === true) ? "red" : "white";
        ctx.fillText(this.damage, this.x, this.y);
    }
}

let up = false, right = false, down = false, left = false;
let space_use = false, q_use = false, e_use = false, r_use = false;
let direction = 2;
document.addEventListener("keydown", press);
function press(e) {
    if(main_screen === true && enforce_screen === false) {
        //W 위쪽
        if(e.keyCode === 87) {
            up = true;
            direction = 0;
        }
        //D 오른쪽
        if(e.keyCode === 68) {
            right = true;
            direction = 1;
        }
        //S 아래쪽
        if(e.keyCode === 83) {
            down = true;
            direction = 2;
        }
        //A 왼쪽
        if(e.keyCode === 65) {
            left = true;
            direction = 3;
        }
        //스페이스
        if(e.keyCode === 32 && space_back_ability === true) {
            character.mana = (character.mana+space_mana_recovery > Mana+addition_mana) ? Mana+addition_mana : character.mana+space_mana_recovery;
            character.x = back_point_x, character.y = back_point_y;
            if(monster_list.length > 0 && space_back === true)
                teleport_list.push(new Teleport_projectile(character.x, character.y));
            space_back_ability = false;
        }
        else if(e.keyCode === 32 && cooldown_list[0][0] <= 0) {
            add_x = 0, add_y = 0;
            cooldown_list[0][1] = Space_skill_cooldown-space_cooldown_reduce;
            let distance = Portal_distance+space_distance_increase;
            if(direction === 0)
                add_y = -(distance);
            else if(direction === 1)
                add_x = distance;
            else if(direction === 2)
                add_y = distance;
            else if(direction === 3)
                add_x = -(distance);
            portal_list.push(new Portal(character.x, character.y, direction), new Portal(character.x+add_x, character.y+add_y, direction));
            cooldown_list[0][0] = Space_skill_cooldown-space_cooldown_reduce;
            character.mana = (character.mana+space_mana_recovery > Mana+addition_mana)? Mana+addition_mana : character.mana+space_mana_recovery;
            if(space_speed_up === true) {
                increase_speed += Space_speed_up_amount;
                space_speed_up_apply = true;
            }
            if(space_back === true) {
                back_point_x = character.x, back_point_y = character.y;
                space_back_timer = 0;
                space_back_ability = true;
                if(monster_list.length > 0)
                    teleport_list.push(new Teleport_projectile(character.x+add_x, character.y+add_y));
            }
        }
        //Q
        if(e.keyCode === 81 && cooldown_list[1][0] <= 0 && character.mana >= Q_skill_mana-q_mana_reduce && character.level >= 1 && (main_page !== 2 || sub_page !== 10)) {
            q_timer = 0;
            cooldown_list[1][1] = Q_skill_cooldown-q_cooldown_reduce;
            flame_list.push(new Darkness_flame(character.x+Flame_size/2, character.y+Flame_size/2, direction));
            cooldown_list[1][0] = Q_skill_cooldown-q_cooldown_reduce;
            character.mana -= Q_skill_mana-q_mana_reduce;
        }
        //E
        if(e.keyCode === 69 && cooldown_list[2][0] <= 0 && character.mana >= E_skill_mana-e_mana_reduce && character.level >= 3) {
            e_timer = 0;
            cooldown_list[2][1] = E_skill_cooldown-e_cooldown_reduce;
            cooldown_list[2][0] = E_skill_cooldown-e_cooldown_reduce;
            character.mana -= E_skill_mana-e_mana_reduce;
            if(e_soul === true && monster_list.length > 0) {
                let over_hp = character.hp+E_skill_amount+e_addition_hp_recovery-(Hp+addition_hp);
                soul_count = 0;
                if(e_soul_upgrade === true)
                    soul_count = E_skill_amount+e_addition_hp_recovery;
                else if(over_hp > 0)
                    soul_count = over_hp;
                soul_start_count = 0;
                soul_spawn = true;
            }
            character.hp = (character.hp+E_skill_amount+e_addition_hp_recovery <= Hp+addition_hp) ? character.hp+E_skill_amount+e_addition_hp_recovery : Hp+addition_hp;
            if(e_hp_steal === true && monster_list.length > 0) {
                let min_distance = canvas.width+canvas.height;
                let near_monster;
                monster_list.forEach((a) => {
                    let monster_distance = two_point_distance(a.x, character.x, a.y, character.y);
                    if(min_distance > monster_distance) {
                        min_distance = monster_distance;
                        near_monster = a;
                    }
                });
                hp_steal_list.push(new Hp_steal_projectile(near_monster.x, near_monster.y));
                monster_hit(near_monster, near_monster, Hp_steal_damage, Hp_steal_projectile_hit_image, true);
            }
            if(e_speed_up === true) {
                increase_speed += E_speed_up_amount;
                e_speed_up_apply = true;
            }
            e_use = true;
        }
        //R
        if(e.keyCode === 82 && cooldown_list[3][0] <= 0 && character.mana >= R_skill_mana-r_mana_reduce && character.level >= 5) {
            r_timer = 0;
            r_cloud_timer = 60*R_skill_effect_time+r_duration;
            cooldown_list[3][1] = R_skill_cooldown-r_cooldown_reduce;
            r_summon_x = character.x-character.width, r_summon_y = character.y-Black_storm_cloud_add_y;
            if(direction === 0)
                r_summon_y -= Black_storm_cloud_distance;
            else if(direction === 1)
                r_summon_x += Black_storm_cloud_distance;
            else if(direction === 2)
                r_summon_y += Black_storm_cloud_distance;
            else if(direction === 3)
                r_summon_x -= Black_storm_cloud_distance;
            cooldown_list[3][0] = R_skill_cooldown-r_cooldown_reduce;
            character.mana -= R_skill_mana-r_mana_reduce;
        }
        //<, >, Enter
        if(tutorial === true) {
            if((e.keyCode === 37 || e.keyCode === 39) && main_page === -1) {
                if(tutorial_main === true)
                    main_page = 0;
            }
            else if(e.keyCode === 37) {
                if(tutorial_main === true) {
                    if(0 < main_page)
                        main_page -= 1; 
                }
                else if(0 < sub_page) {
                    sub_page -= 1;
                    tutorial_miniquest();
                } 
            }
            else if(e.keyCode === 39) {
                if(tutorial_main === true) {
                    if(main_page < tutorial_text.length-1)
                        main_page += 1;
                }
                else if(sub_page < tutorial_limit) {
                    sub_page += 1;
                    tutorial_miniquest();
                }
                else if(sub_page === sub_tutorial_text[main_page].length-1) {
                    status_reset(0);
                    tutorial_main = true;
                }
            }
            if(e.keyCode === 13 && 0 <= main_page && tutorial_main === true) {
                if(main_page === 0)
                    tutorial_limit = 4;
                else if(main_page === 1)
                    tutorial_limit = sub_tutorial_text[main_page].length-1;
                else if(main_page === 2)
                    tutorial_limit = 4;
                else if(main_page === 3)
                    tutorial_limit = 7;
                tutorial_main = false;
                sub_page = 0;
            }
        }
    }
    //ESC
    if(e.keyCode === 27 && enforce_screen === false && start_screen === false) {
        if(esc_screen === false) {
            esc_screen = true;
            esc_ui.draw();
        }
        else 
            esc_screen = false;
    }
    //T
    if(e.keyCode === 84 && main_screen === true) {
        if(enforce_screen === true) {
            enforce_skill_limit = enforce_skill.slice();
            enforce_screen = false;
            enforce_renewal();
        }
        else {
            enforce_screen = true;
            enforce_count = 0;
            enforce_text_draw(0, 1);
        }
    }
}
document.addEventListener("keyup", release);
function release(e) {
    if(e.keyCode === 87)
        up = false;
    if(e.keyCode === 68)
        right = false;
    if(e.keyCode === 83)
        down = false;
    if(e.keyCode === 65)
        left = false;

    if(e.keyCode === 87 || e.keyCode === 68 || e.keyCode === 83 || e.keyCode === 65) {    
        if(up)
            direction = 0;
        else if(right)
            direction = 1;
        else if(down)
            direction = 2;
        else if(left)
            direction = 3;
    }
}
let start_button_hover_01 = false, start_button_hover_02 = false;
let enforce_up_hover = false, enforce_down_hover = false, enforce_icon_hover = false;
let enforce_count = 0;
let esc_button_hover = [false, false];
let addition_hp = 0, addition_mana = 0;
function start_button_hover_check(event) {
    if((Start_ui_text_x-Start_ui_button_width/2 <= event.clientX && event.clientX < Start_ui_text_x+Start_ui_button_width/2) && (Start_ui_text_y+Start_ui_button_height/2.5 < event.clientY && event.clientY < Start_ui_text_y+Start_ui_button_height*1.5))
        start_button_hover_01 = true;
    else
        start_button_hover_01 = false;
    if((Start_ui_text_x-Start_ui_button_width/2 <= event.clientX && event.clientX < Start_ui_text_x+Start_ui_button_width/2) && (Start_ui_text_y+Start_ui_button_height*1.9 < event.clientY && event.clientY < Start_ui_text_y+Start_ui_button_height*3))
        start_button_hover_02 = true;
    else
        start_button_hover_02 = false;
}
function enforce_button_hover_check(event) {
    let count = 0;
        enforce_icon_hover = false;
        enforce_up_hover = false;
        enforce_down_hover = false;
        for(let i=0; i<3; i++) {
            for(let j=0; j<2; j++) {
                //스킬 아이콘 클릭
                let x_point = enforce_ui.x+j*(enforce_ui.width/Enforce_ui_skill_area_x*2)+enforce_ui.width/Enforce_ui_skill_area_x;
                let y_point = enforce_ui.y+i*(enforce_ui.height/Enforce_ui_skill_area_y+enforce_ui_interval)+enforce_ui_interval;
                if((x_point < event.clientX && event.clientX < x_point+enforce_ui.width/Enforce_ui_skill_area_x) && (y_point < event.clientY && event.clientY < y_point+enforce_ui_interval+enforce_ui.height/Enforce_ui_skill_area_y)) {
                    enforce_icon_hover = true;
                    enforce_count = count;
                }
                //강화 버튼 위쪽
                x_point -= enforce_ui.width/Enforce_ui_skill_area_x/2
                if((x_point < event.clientX && event.clientX < x_point+enforce_ui.width/Enforce_ui_skill_area_x/2) && (y_point < event.clientY && event.clientY < y_point+enforce_ui.height/Enforce_ui_skill_area_y/2)) {
                    enforce_up_hover = true;
                    enforce_count = count;
                }
                //강화 버튼 아래쪽
                y_point += enforce_ui.height/Enforce_ui_skill_area_y/2;
                if((x_point < event.clientX && event.clientX < x_point+enforce_ui.width/Enforce_ui_skill_area_x/2) && (y_point < event.clientY && event.clientY < y_point+enforce_ui.height/Enforce_ui_skill_area_y/2)) {
                    enforce_down_hover = true;
                    enforce_count = count;
                }
                count++;
            }
        }
}
function esc_button_hover_check(event) {
    for(let i=0; i<menu_count; i++) {
        let interval = (esc_ui.height-Esc_ui_menu_height*menu_count)/(menu_count+1)*(i+1)+Esc_ui_menu_height*i;
        if((esc_ui.x+(esc_ui.width-Esc_ui_menu_width)/2-Esc_line_size/2 < event.clientX && event.clientX < esc_ui.x+(esc_ui.width-Esc_ui_menu_width)/2+Esc_ui_menu_width) && (esc_ui.y+interval-Esc_line_size/2 < event.clientY && event.clientY < esc_ui.y+interval+Esc_ui_menu_height))
            esc_button_hover[i] = true;
        else
            esc_button_hover[i] = false;
    }
}
function hover_size_control(hover_value, hover_test, hover_amount) {
    hover_value.value = (hover_test === true) ? hover_amount : 0;
}
document.addEventListener("mousemove", (event) => {
    if(start_screen === true) {
        start_button_hover_check(event);
        hover_size_control(start_button_hover_size_01, start_button_hover_01, Start_ui_button_hover_radius);
        hover_size_control(start_button_hover_size_02, start_button_hover_02, Start_ui_button_hover_radius);
    }
    if(enforce_screen === true) {
        enforce_button_hover_check(event);
    }
    if(esc_screen === true) {
        ctx.clearRect(esc_ui.x, esc_ui.y, esc_ui.width, esc_ui.height);
        esc_button_hover_check(event);
        hover_size_control(esc_button_hover_size[0], esc_button_hover[0], Esc_ui_button_hover_radius);
        hover_size_control(esc_button_hover_size[1], esc_button_hover[1], Esc_ui_button_hover_radius);
        esc_ui.draw();
    }
});
let enforce_skill = [0, 0, 0, 0, 0, 0],
    enforce_skill_limit = [0, 0, 0, 0, 0, 0],
    enforce_skill_length = [6, 9, 9, 9];
let stat_point = 1, skill_point = 1;
let space_cooldown_reduce = 0, space_distance_increase = 0, space_speed_up = false, space_speed_up_timer = 0, space_speed_up_apply = false, space_mana_recovery = 0, space_back = false, space_back_timer = 0, space_back_ability = false, back_point_x, back_point_y,
    q_addition_damage = 0, q_cooldown_reduce = 0, q_penetrate = false, q_mana_reduce = 0, q_addition_speed = 0, q_fear = false, q_mana_recovery = 0, q_harvestring = false, harvestring_stack = 0, harvestring_damage = 0,
    e_mana_reduce = 0, e_addition_hp_recovery = 0, e_hp_steal = false, e_cooldown_reduce = 0, e_soul = false, e_speed_up = false, e_soul_upgrade = false, e_speed_up_apply = false, e_speed_up_timer = 0, soul_timer = 0, soul_count = 0, soul_spawn = false, soul_start_count = 0, e_soul_damage = 0,
    r_addition_damage = 0, r_mana_reduce = 0, r_frequence_reduce = 0, r_cooldown_reduce = 0, r_slow = false, r_shock = false, r_duration = 0, r_cooldown_ability = false, r_mana_recovery = true;
let enforce_text = [
    ["현재 체력 최대치: ", "현재 증가량: "],
    ["현재 마나 최대치: ", "현재 증가량: "],
    ["1 - 쿨타임이 0.5초 감소합니다.",
    "2 - 이동 거리가 약간 늘어납니다.",
    "3 - 1초간 이동속도가 약간 빨라집니다.",
    "4 - 쿨타임이 1.5초 감소합니다.",
    "5 - 순간이동 할때마다 5의 마나를 회복합니다.",
    "6 - 2초내로 재사용시 순간이동하기 전의 위치로 이동합니다.",
    "     순간이동 할때마다 가장 가까운 적에게 2의 피해를 입힙니다."],
    ["1 - 피해량이 1만큼 늘어납니다.",
    "2 - 쿨타임이 0.2초 감소합니다.",
    "3 - 투사체가 적을 관통하여 피해를 입힙니다.",
    "4 - 소모 마나가 5만큼 감소합니다.",
    "5 - 투사체의 속도가 더 빨라집니다.",
    "6 - 투사체에 맞은 적은 「 두려움 」을 1중첩 얻습니다.",
    "    「 두려움 」이 3중첩이 되면 폭발하여 20의 피해를 입습니다.",
    "7 - 피해량이 2만큼 늘어납니다.",
    "8 - 적중한 적 하나당 1의 마나를 회복합니다.",
    "9 - 적을 10마리 처치할때마다 「 수확 」을 1중첩 획득합니다.",
    "    「 수확 」의 중첩 수 만큼 추가로 피해를 입힙니다."],
    ["1 - 소모 마나가 5만큼 감소합니다.",
    "2 - 회복량이 5만큼 늘어납니다.",
    "3 - 가장 가까운 적의 체력을 5만큼 훔쳐옵니다.",
    "4 - 쿨타임이 1초 감소합니다.",
    "5 - 회복량이 10만큼 늘어납니다.",
    "6 - 초과한 체력만큼 「 영혼 」을 소환합니다.",
    "    「 영혼 」은 가까운 적에게 날아가 각각 1의 피해를 입힙니다.",
    "7 - 소모 마나가 10만큼 감소합니다.",
    "8 - 쿨타임이 2초 감소하고, 1초간 이동속도가 약간 빨라집니다.",
    "9 - 초과한 체력이 아닌 회복량만큼 「 영혼 」을 소환합니다.",
    "     「 영혼 」이 입히는 피해가 2만큼 늘어납니다."],
    ["1 - 초당 피해량이 2만큼 늘어납니다.",
    "2 - 소모 마나가 10만큼 감소합니다.",
    "3 - 폭풍우가 0.25초마다 피해를 입힙니다.",
    "4 - 쿨타임이 3초 감소합니다.",
    "5 - 피해를 받은 적의 이동속도가 약간 감소합니다.",
    "6 - 피해를 받은 적은 7초간 「 감전 」 상태가 됩니다.",
    "    「 감전 」 상태의 적은 피해를 받을때마다 2의 추가 피해를 입습니다.",
    "7 - 지속시간이 1초 늘어납니다.",
    "8 - 쿨타임이 7초 감소합니다.",
    "9 - 「 감전 」 상태의 적이 피해를 받을때마다 모든 스킬의 쿨타임이 ",
    "      0.3초 감소하고 마나를 2만큼 회복합니다."
    ]];
function enforce_renewal() {
    space_cooldown_reduce = 0, space_distance_increase = 0, space_speed_up = false, space_mana_recovery = 0, space_back = false;
    if(enforce_skill[2] >= 1)
        space_cooldown_reduce += Space_cooldown_reduce_amount_01;
    if(enforce_skill[2] >= 2)
        space_distance_increase += Space_distance_increase_amount;
    if(enforce_skill[2] >= 3)
        space_speed_up = true;
    if(enforce_skill[2] >= 4)
        space_cooldown_reduce += Space_cooldown_reduce_amount_02;
    if(enforce_skill[2] >= 5)
        space_mana_recovery = Space_mana_recovery_amount;
    if(enforce_skill[2] >= 6)
        space_back = true;

    q_addition_damage = 0, q_cooldown_reduce = 0, q_penetrate = false, q_mana_reduce = 0, q_addition_speed = 0, q_fear = false, q_mana_recovery = 0, q_harvestring = false;
    if(enforce_skill[3] >= 1)
        q_addition_damage += Q_addition_damage_amount_01;
    if(enforce_skill[3] >= 2)
        q_cooldown_reduce = Q_cooldown_reduce_amount;
    if(enforce_skill[3] >= 3)
        q_penetrate = true;
    if(enforce_skill[3] >= 4)
        q_mana_reduce = Q_mana_reduce_amount;
    if(enforce_skill[3] >= 5)
        q_addition_speed += Q_addition_speed_amount;
    if(enforce_skill[3] >= 6)
        q_fear = true;
    if(enforce_skill[3] >= 7)
        q_addition_damage += Q_addition_damage_amount_02;
    if(enforce_skill[3] >= 8)
        q_mana_recovery = Q_mana_recovery_amount;
    if(enforce_skill[3] >= 9)
        q_harvestring = true;

    e_mana_reduce = 0, e_addition_hp_recovery = 0, e_cooldown_reduce = 0, e_hp_steal = false, e_soul = false, e_speed_up = false, e_soul_upgrade = false, e_soul_damage = 0;
    if(enforce_skill[4] >= 1)
        e_mana_reduce += E_mana_reduce_amount_01;
    if(enforce_skill[4] >= 2)
        e_addition_hp_recovery += E_hp_recovery_amount_01;
    if(enforce_skill[4] >= 3)
        e_hp_steal = true;
    if(enforce_skill[4] >= 4)
        e_cooldown_reduce = E_cooldown_reduce_amount_01;
    if(enforce_skill[4] >= 5)
        e_addition_hp_recovery += E_hp_recovery_amount_02;
    if(enforce_skill[4] >= 6) {
        e_soul = true;
        e_soul_damage += E_soul_addition_damage_amount_01;
    }
    if(enforce_skill[4] >= 7)
        e_mana_reduce += E_mana_reduce_amount_02;
    if(enforce_skill[4] >= 8) {
        e_cooldown_reduce += E_cooldown_reduce_amount_02;
        e_speed_up = true;
    } 
    if(enforce_skill[4] >= 9) {
        e_soul_upgrade = true;
        e_soul_damage += E_soul_addition_damage_amount_02;
    }

    r_addition_damage = 0, r_mana_reduce = 0, r_falling_frequence_up = false, r_frequence_reduce = 0, r_cooldown_reduce = 0, r_slow = false, r_shock = false, r_duration = 0, r_cooldown_ability = false, r_mana_recovery = false;
    if(enforce_skill[5] >= 1)
        r_addition_damage += R_addition_damage_amount;
    if(enforce_skill[5] >= 2)
        r_mana_reduce += R_mana_reduce_amount;
    if(enforce_skill[5] >= 3)
        r_frequence_reduce += R_frequence_reduce_amount;
    if(enforce_skill[5] >= 4)
        r_cooldown_reduce += R_cooldown_reduce_amount_01;
    if(enforce_skill[5] >= 5)
        r_slow = true;
    if(enforce_skill[5] >= 6)
        r_shock = true;
    if(enforce_skill[5] >= 7)
        r_duration += R_duration_amount_01;
    if(enforce_skill[5] >= 8)
        r_cooldown_reduce += R_cooldown_reduce_amount_02;
    if(enforce_skill[5] >= 9) {
        r_cooldown_ability = true;
        r_mana_recovery = true;
    }

    //쿨타임 갱신
    //cooldown_list[n][1] = Space_skill_cooldown-space_cooldown_reduce;
}

function enforce_text_draw(count, next_interval) {
    //상태바 갱신
    hp_bar = new Condition_bar(Condition_ui_x+120, Condition_ui_y+45, Condition_ui_width*0.525, Condition_ui_height*0.2, Hp+addition_hp, character.hp+addition_hp, "rgb(215,48,48)");
    mana_bar = new Condition_bar(Condition_ui_x+120, Condition_ui_y+80, Condition_ui_width*0.525, Condition_ui_height*0.2, Mana+addition_mana, character.mana+addition_mana, "rgb(31, 135, 196)");

    let enforce_text_interval = ((enforce_ui.height-enforce_ui_interval*3)-Enforce_text_font_size*enforce_text[count].length)/(enforce_text[count].length+1);
    let text_line_count = [[0, 1, 2, 3, 4, 5, 8], [0, 1, 2, 3, 4, 5, 7, 8, 9, 11], [0, 1, 2, 3, 4, 5, 7, 8, 9, 11], [0, 1, 2, 3, 4, 5, 7, 8, 9, 12]];
    ctx.clearRect(enforce_ui.x, enforce_ui.y, enforce_ui.width, enforce_ui.height);
    enforce_ui.draw();
    for(let text of enforce_text[count]) {
        ctx.fillStyle = "black";
        if(count < 2) {
            ctx.font = "bold "+(Enforce_text_font_size+10)+"px '맑은고딕'";
        }
        else {
            ctx.font = "bold "+Enforce_text_font_size+"px '맑은고딕'";
            if(next_interval <= text_line_count[count-2][enforce_skill[count]])
                ctx.fillStyle = "lime";
        }
        ctx.fillText(text, enforce_ui.x+enforce_ui.width/2+10, enforce_ui.y+enforce_ui_interval*2+enforce_text_interval*next_interval+Enforce_text_font_size*next_interval);
        if(count < 2) {
            let enforce_list = [Hp+addition_hp, addition_hp, Mana+addition_mana, addition_mana]
            ctx.fillText(enforce_list[next_interval-1+count*2], enforce_ui.x+enforce_ui.width/2+10+(Enforce_text_font_size+3)*enforce_text[count][next_interval-1].length, enforce_ui.y+enforce_ui_interval*2+enforce_text_interval*next_interval+Enforce_text_font_size*next_interval);
        }
        next_interval++;
    }
}
function esc_button_click_check() {
    for(let i=0; i<esc_button_hover.length; i++) {
        if(esc_button_hover[i] === true) {
            switch(i) {
                case 0:
                    come_main();
                    break;
                case 1:
                    exit();
                    break;
            }
        }
    }
}
let start_button_click_01 = false, start_button_click_02 = false;
document.addEventListener("mousedown", () => {
    if(start_button_hover_01 === true && start_screen === true && vinetting_change === false) {
        start_button_click_01 = true;
    }
    if(start_button_hover_02 === true && start_screen === true && vinetting_change === false) {
        start_button_click_02 = true;
        tutorial = true;
    }
    if(enforce_screen === true) {
        if(enforce_icon_hover === true) {
            enforce_text_draw(enforce_count, 1);
        }
        //강화 버튼 위쪽
        if(enforce_up_hover === true) {
            if(enforce_count < 2 && 0 < stat_point) {
                stat_point--;
                enforce_skill[enforce_count]++;
                if(enforce_count == 0) {
                    addition_hp += Enfroce_hp_increase;
                    character.hp += Enfroce_hp_increase;
                }
                else if(enforce_count == 1) {
                    addition_mana += Enfroce_mana_increase;
                    character.mana += Enfroce_mana_increase;
                }
            }
            else if(2 <= enforce_count && 0 < skill_point && enforce_skill[enforce_count] < enforce_skill_length[enforce_count-2]) {
                skill_point--;
                enforce_skill[enforce_count]++;
            }
            enforce_text_draw(enforce_count, 1);
        }
        //강화 버튼 아래쪽
        if(enforce_down_hover === true) {
            if(enforce_count < 2 && enforce_skill_limit[enforce_count] < enforce_skill[enforce_count]) {
                stat_point++;
                enforce_skill[enforce_count]--;
                if(enforce_count == 0) {
                    addition_hp -= Enfroce_hp_increase;
                    character.hp -= Enfroce_hp_increase;
                }                            
                else if(enforce_count == 1) {
                    addition_mana -= Enfroce_mana_increase;
                    character.mana -= Enfroce_mana_increase;
                }
            }
            else if(2 <= enforce_count && enforce_skill_limit[enforce_count] < enforce_skill[enforce_count]) {
                skill_point++;
                enforce_skill[enforce_count]--;
            }
            enforce_text_draw(enforce_count, 1);
        }
    }
    if(esc_screen === true)
        esc_button_click_check();
});

let start_button_hover_size_01 = {value : 0}, start_button_hover_size_02 = {value : 0},
    esc_button_hover_size = [{value : 0}, {value : 0}],
    start_vignetting = -1, opacity = 0, vinetting_change = false;
function start_timer() {
    animation = requestAnimationFrame(start_timer);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(start_button_click_01 === true || start_button_click_02 === true) {
        vinetting_change = true;
        start_button_click_01 = false;
        start_button_click_02 = false;
        vinetting_timer();
        setTimeout(() => {game_start()}, Vignetting_time/60*1000-Vignetting_delay);
    }
    start_ui.draw();
}

let tutorial_spawn_timer = -1;
function tutorial_timer() {
    tutorial_frame = requestAnimationFrame(tutorial_timer);
    tutorial_ui.draw();
    if(tutorial_spawn_timer%(60*5) === 0) {
        [monster_x, monster_y] = monster_spawnpoint();
        monster_list.push(new Slime(monster_x, monster_y));
        monster_hp_bar_list.push(new Condition_bar(monster_x, monster_y, Slime_width, Monster_hp_bar_height, Slime_hp, Slime_hp, "red"));
    }
    if(main_page === 0 && sub_page === 4) {
        tutorial_object.draw();
        if(collision(tutorial_object, character)) {
            tutorial_limit += 2;
            sub_page++;
        }
    }
    else if((main_page === 2 && sub_page === 4 && monster_list.length === 0) || (main_page === 2 && sub_page === 7 && character.hp === Hp+addition_hp)) {
        tutorial_limit += 3;
        sub_page++;
    }
    else if(main_page === 2 && sub_page === 17 && stat_point === 0 && skill_point === 0) {
        tutorial_limit += 2;
        sub_page++;
    }
    else if(main_page === 2 && sub_page === 10 && monster_list.length === 0) {
        tutorial_limit += 7;
        sub_page++;
    }
    else if(main_page === 3 && sub_page === 7) {
        if(Tutorial_object_count <= kill_count_list[0]) {
            tutorial_limit += 2;
            sub_page++;
            tutorial_spawn_timer = -2;
            monster_list = [];
            monster_hp_bar_list = [];
        }
        if(character.hp <= 0) {
            monster_list = [];
            monster_hp_bar_list = [];
            sub_page--;
            character.hp = Hp+addition_hp;
        }
        tutorial_spawn_timer++;
        renewal_object(0, kill_monster_object_text(Monster_name[0], kill_count_list[0], Tutorial_object_count));
        object_ui.draw();
    }
}
//스테이지
let stage = 1;
let mode = Battle;
let stage_change_time = 0;
var kill_count_list = [];
let spawn_list = [];       
let spawn_infor_list =  //Chapter 1
                        [[Slime], [Bugs], [Crow], [WildBoar], [Tar], 
                        [ShadowWolf], [Floower], [WitheredFlower], [ManEatingFlower],
                        //Chapter 2
                        [Ray], [Jellyfish], [Octopus], [SeaMonster]];
for (let i = 0; i < spawn_infor_list.length; i++)
        spawn_infor_list[i].push(Default_spawn_time);
function battle_object(n) {
    let cnt = 0;
    for(let i=0; i<SpawnList[n].length; i++) {
        let num = SpawnList[n][i].monster;
        renewal_object(i, kill_monster_object_text(Monster_name[num], kill_count_list[num], SpawnList[n][i].objectCount));
        if(check_kill_count(SpawnList[n][i].monster, SpawnList[n][i].objectCount)) cnt++;
    }
    return (cnt >= SpawnList[n].length) ? true : false;
}
function survival_object(n) {
    for(let i=0; i<SpawnList[n].length; i++)
        renewal_object(i, survival_object_text(Survival_stage_time[n]-Math.floor((game_timer-stage_change_time)/60)));
    return (stage_change_time+Survival_stage_time[n]*60 <= game_timer) ? true : false;
}
let stage_ui = {
    draw() {
        ctx.strokeStyle = "black";
        ctx.lineJoin = "round";
        ctx.lineWidth = Stage_ui_button_corner;
        ctx.beginPath();
        ctx.strokeRect(Stage_ui_text_x-Stage_ui_button_width/2-Stage_ui_button_stroke_size+(Stage_ui_button_corner/2), Stage_ui_text_y+Stage_ui_button_height*2-Stage_ui_button_stroke_size+(Stage_ui_button_corner/2), Stage_ui_button_width-Stage_ui_button_corner+Stage_ui_button_stroke_size*2, Stage_ui_button_height-Stage_ui_button_corner+Stage_ui_button_stroke_size*2);
        ctx.strokeStyle = Stage_ui_button_color;
        ctx.strokeRect(Stage_ui_text_x-Stage_ui_button_width/2+(Stage_ui_button_corner/2), Stage_ui_text_y+Stage_ui_button_height*2+(Stage_ui_button_corner/2), Stage_ui_button_width-Stage_ui_button_corner, Stage_ui_button_height-Stage_ui_button_corner);
        ctx.fillStyle = "black";
        ctx.font = "bold "+(Stage_ui_button_font_size)+"px '나눔고딕'";
        ctx.textAlign = "center";
        ctx.fillText("Stage "+stage, Stage_ui_text_x, Stage_ui_text_y+Stage_ui_button_height*2.5+10);
    }
}

let animation;
let main_screen = false, start_screen = true, enforce_screen = false, tutorial = false, esc_screen = false;
let next_exp = Next_exp, level_up_timer = Level_up_time;
let game_timer = 0, time = 0;
let chr_image_timer = 0, chr_image_change = 0;
let increase_speed = 0;
let add_x, add_y;
let flame_list = [], hit_image_list = [],
    portal_list = [], teleport_list = [],
    hp_steal_list = [], soul_list = [],
    shoke_image_list = [],
    monster_list = [], monster_hp_bar_list = [],
    damage_text_list = [],
    condition_bar_list = [], skill_ui_list = [], cooldown_bar_list = [], skill_key_list = [];
let space_timer = 0,
    q_timer = 0, q_image_change = 0,
    e_timer = 0,
    r_timer = 0, r_range_list = [], random_monster_index, r_thunder_timer = 0, r_thunder_x, r_thunder_y, r_cloud_timer = 0;
var r_summon_x = 0, r_summon_y = 0;
let monster_x, monster_y, random_num;
let cooldown_list = [[0, Space_skill_cooldown], [0, Q_skill_cooldown], [0, E_skill_cooldown], [0, R_skill_cooldown]];

set_stage(1);
function main_timer() {
    animation = requestAnimationFrame(main_timer);
    if(main_screen === true && enforce_screen === false && esc_screen === false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game_timer += 1;
        if(game_timer % 60 === 0)
            time += 1;
        if(game_timer % 20 === 0 && character.mana < Mana+addition_mana)
            character.mana++;

        //< Main Character >
        if(up === true || right === true || down === true || left === true) {
            chr_image_timer++;
            if(chr_image_timer % 20 === 0)
                chr_image_change++;
        }
        let movemove_distance = Movement_speed+increase_speed;
        if(up && character.y > -character.height/2) {
            if(up && (right || down || left))
                character.y -= movemove_distance/2+movemove_distance/5;
            else
                character.y -= movemove_distance;
        }
        if(right && character.x < canvas.width-character.width/2) {
            if(right && (up || down || left))
                character.x += movemove_distance/2+movemove_distance/5;
            else
                character.x += movemove_distance;
        }
        if(down && character.y < canvas.height-character.height/2) {
            if(down && (up || right || left))
                character.y += movemove_distance/2+movemove_distance/5;
            else
                character.y += movemove_distance;
        }
        if(left && character.x > -character.width/2) {
            if(left && (up || right || down))
                character.x -= movemove_distance/2+movemove_distance/5;
            else
                character.x -= movemove_distance;
        }
        if(character.exp >= next_exp) {
            character.level += 1;
            character.exp = character.exp-next_exp;
            stat_point++;
            if(character.level%2 === 1)
                skill_point++;
            level_up_timer = 0;
            next_exp *= Next_exp_magnification;
            exp_bar.max = next_exp;
        }
        level_up_timer++;
        if(level_up_timer < Level_up_time)
            level_up.draw(character.x+50, character.y-level_up_timer);

        //< Spacebar - Dimension Movement >
        if(cooldown_list[0][0] > 0) {
            space_timer++;
            if(space_timer % 2 === 0)
                cooldown_list[0][0] -= 1/30;
        }
        if(space_speed_up_apply === true) {
            space_speed_up_timer += 1;
            if(space_speed_up_timer%(Space_speed_up_duration*60) === 0) {
                increase_speed -= Space_speed_up_amount;
                space_speed_up_apply = false;
            }
        }
        if(space_back_ability === true) {
            ctx.beginPath();
            ctx.arc(cooldown_bar_list[0].x, Cooldown_ui_y, Cooldown_ui_radius+1, Math.PI*2, false);
            ctx.lineWidth = 7;
            ctx.strokeStyle = "purple";
            ctx.stroke();
            space_back_timer += 1;
            if(space_back_timer%(Space_back_ability_duration*60) === 0)
                space_back_ability = false;
        }
        if(portal_list.length > 0) {
            portal_list.forEach((a, i, o) => {
                a.timer++;
                if(a.timer > 10)
                    o.splice(i, 2);
                a.draw();
            });
            if(cooldown_list[0][0] === Space_skill_cooldown-space_cooldown_reduce) {
                let distance = Portal_distance+space_distance_increase;
                switch (direction) {
                    case 0:
                        if(character.y - distance > -character.height/2)
                            character.y -= distance;
                        else
                            character.y = -character.height/2;
                        break;
                    case 1:
                        if(character.x + distance < canvas.width-character.width/2)
                            character.x += distance;
                        else
                            character.x = canvas.width-character.width/2;
                        break;
                    case 2:
                        if(character.y + distance < canvas.height-character.height/2)
                            character.y += distance;
                        else
                            character.y = canvas.height-character.height/2;
                        break;
                    case 3:
                        if(character.x - distance > -character.width/2)
                            character.x -= distance;
                        else
                            character.x = -character.width/2;
                        break;
                }
                space_use = false;
            }
        }
        if(monster_list.length === 0)
            teleport_list = [];
        for(let i=0; i<teleport_list.length; i++) {
            a = teleport_list[i];
            let near_monster = near_object_search(a, monster_list);
            a.distance = two_point_distance(a.x, near_monster.x, a.y, near_monster.y);
            a.x += (near_monster.x - a.x) / (a.distance/a.speed);
            a.y += (near_monster.y - a.y) / (a.distance/a.speed);
            if(collision(a, near_monster) && near_monster.hit === false) {
                monster_hit(a, near_monster, Teleport_projectile_damage, Teleport_projectile_hit_image, true);
                teleport_list.splice(i--, 1);
            }
            a.draw();
        };
        
        //< Q - Darkness Flame >
        if(cooldown_list[1][0] > 0) {
            q_timer++;
            if(q_timer % 2 === 0)
                cooldown_list[1][0] -= 1/30;
        }
        for(let i=0; i<flame_list.length; i++) {
            a = flame_list[i];        
            a.timer++;
            if(a.timer % 20 === 0)
                a.image_change = (a.image_change+1)%2;
            if(a.direc === 0)
                a.y -= Q_skill_speed+q_addition_speed;
            else if(a.direc === 1)
                a.x += Q_skill_speed+q_addition_speed;
            else if(a.direc === 2)
                a.y += Q_skill_speed+q_addition_speed;
            else if(a.direc === 3)
                a.x -= Q_skill_speed+q_addition_speed;
            if(a.y < -100 || a.x > canvas.width || a.y > canvas.height || a.x < -100)
                flame_list.splice(i--, 1);
            monster_list.some((b) => {
                if(collision(a, b) && b.hit === false) {
                    //관통
                    if(a.hit_monster.includes(b) === false) {
                        monster_hit(a, b, Q_skill_damage+q_addition_damage+harvestring_damage, Darkness_flame_hit_image, true);
                        fear(b);
                        character.mana += q_mana_recovery;
                        if(q_penetrate === true)
                            a.hit_monster.push(b);
                    }
                    if(q_penetrate === false) {
                        flame_list.splice(i--, 1);
                        return true;
                    }
                }
            });
            a.draw();
        };

        //< E - Whispers of the dead >
        if(cooldown_list[2][0] > 0) {
            e_timer++;
            if(e_timer % 2 === 0)
                cooldown_list[2][0] -= 1/30;
            if(cooldown_list[2][0] > E_skill_cooldown-E_skill_effect_time-e_cooldown_reduce)
                (e_timer % 20 < 10) ? dead_whisper.draw(0, 0) : dead_whisper.draw(1, 0);
        }
        if(e_speed_up_apply === true) {
            e_speed_up_timer += 1;
            if(e_speed_up_timer%(E_speed_up_duration*60) === 0) {
                increase_speed -= E_speed_up_amount;
                e_speed_up_apply = false;
            }
        }
        for(let i=0; i<hp_steal_list.length; i++) {
            a = hp_steal_list[i];
            a.distance = two_point_distance(a.x, character.x, a.y, character.y);
            a.x += (character.x-a.x) / (a.distance/a.speed);
            a.y += (character.y-a.y) / (a.distance/a.speed);
            if(collision(a, character)) {
                character.hp = (character.hp+Hp_steal_damage < Hp+addition_hp) ? character.hp+Hp_steal_damage : Hp+addition_hp;
                hp_steal_list.splice(i--, 1);
            }
            a.draw();
        };
        if(monster_list.length === 0) {
            soul_list = [];
            soul_spawn = false;
        }
        for(let i=0; i<soul_list.length; i++) {
            a = soul_list[i];
            let near_monster = near_object_search(a, monster_list);
            a.distance = two_point_distance(a.x, near_monster.x, a.y, near_monster.y);
            a.x += (near_monster.x-a.x) / (a.distance/a.speed);
            a.y += (near_monster.y-a.y) / (a.distance/a.speed);
            if(collision(a, near_monster) && near_monster.hit === false) {
                monster_hit(a, near_monster, e_soul_damage, Teleport_projectile_hit_image, true);
                soul_list.splice(i--, 1);
            }
            a.draw();
        };
        if(soul_spawn === true) {
            soul_timer++;
            if(soul_start_count < soul_count && soul_timer%15 === 0) {
                soul_start_count++;
                soul_list.push(new Soul(character.x, character.y, get_random_value(-Soul_random_spawn_range, Soul_random_spawn_range), get_random_value(-Soul_random_spawn_range, Soul_random_spawn_range)));
            }
            else if(soul_start_count >= soul_count)
                soul_timer = 0, soul_spawn = false;
        }

        character.draw();
        if(character.hp <= 0 && tutorial === false)
            cancelAnimationFrame(animation);

        //< R - Black Storm >
        r_cloud_timer--;
        if(cooldown_list[3][0] > 0) {
            if(r_thunder_timer > 0) {
                black_storm_thunder.draw(r_thunder_x, r_thunder_y-Black_storm_thunder_height+20, get_random_value(0, 1));
                r_thunder_timer--;
            }
            if(r_timer % 2 === 0)
                cooldown_list[3][0] -= 1/30;      
            if(r_cloud_timer > 0) {
                new Black_storm_cloud(r_summon_x, r_summon_y-Black_storm_thunder_height+80).draw();
                var storm_range_01 = new Black_storm_range(r_summon_x-Black_storm_range_width/2, r_summon_y+Black_storm_cloud_add_y, (Black_storm_cloud_width+Black_storm_range_width)/2, Black_storm_cloud_height+Black_storm_range_height);
                var storm_range_02 = new Black_storm_range(r_summon_x-Black_storm_range_width/2+(Black_storm_cloud_width+Black_storm_range_width)/2, r_summon_y+Black_storm_cloud_add_y, (Black_storm_cloud_width+Black_storm_range_width)/2, Black_storm_cloud_height+Black_storm_range_height);
                storm_range_01.draw();
                storm_range_02.draw();
                if(r_timer % (R_frequence-r_frequence_reduce) === 0) {
                    r_range_list = [];
                    //범위내에 있는 몬스터들
                    monster_list.forEach((a) => {
                        if(collision(storm_range_01, a) || collision(storm_range_02, a) || collision(a, storm_range_01) || collision(a, storm_range_02))
                            r_range_list.push(a);
                    });
                    if(r_range_list.length > 0) {
                        random_monster_index = get_random_value(0, r_range_list.length-1);
                        monster_hit(null, r_range_list[random_monster_index], R_skill_damage+r_addition_damage, null, false);
                        if(r_slow === true)
                            r_range_list[random_monster_index].r_slow_time = R_slow_duration;
                        if(r_shock === true)
                            r_range_list[random_monster_index].shoke_time = R_shoke_duration;
                        if(r_mana_recovery === true)
                            character.mana += 2;
                        r_thunder_x = r_range_list[random_monster_index].x;
                        r_thunder_y = r_range_list[random_monster_index].y;
                        r_thunder_timer = R_thunder_image_time;
                    }
                }
            }
            r_timer++;
        }    

        //< Monster >
        for(let i=0; i<spawn_list.length; i++) {
            if((game_timer%(60*spawn_list[i][1]) === 0) && tutorial === false) {
                [monster_x, monster_y] = monster_spawnpoint();
                let obj = new spawn_list[i][0](monster_x, monster_y);
                monster_list.push(obj);
                monster_hp_bar_list.push(new Condition_bar(monster_x, monster_y, obj.width, Monster_hp_bar_height, obj.hp, obj.hp, "red"));
                if(obj instanceof Boss_monster) spawn_list.pop();
            }
        }
        
        //몬스터 관리
        for (let i=0; i<monster_list.length; i++) {
            a = monster_list[i];
            a.timer++;
            a.speed_reduce = 0;
            a.ability(a);
            //피격
            if(!a.hit && a.image_change_ability) {
                if(a.timer % 20 === 0)
                    a.image_change = (a.image_change+1)%2;
                a.hit_timer++;
                if(a.hit_timer % 20 === 0)
                    a.hit_image_change = false;
            }
            else {
                if(a.shoke_time > 0) {
                    a.hp -= Shoke_damage;
                    damage_text_list.push(new Damage_text(Shoke_damage, a.x, a.y, get_random_value(-3, 3), false));
                }
                if(r_cooldown_ability === true) {
                    for(let index=0; index<cooldown_list.length; index++) {
                        if(cooldown_list[index][0] > R_cooldown_ability_amount)
                            cooldown_list[index][0] -= R_cooldown_ability_amount;
                    }
                }
                a.hit_timer = 0;
                a.hit_image_change = true;
                a.hit = false;
            }
            if(a.shoke_time > 0) {
                shoke_image_list.push(new Shoke_image(a.x, a.y, a.width, a.height, ((a.shoke_time%20 < 10) ? 0 : 1)));
            }
            if(a.speed !== 0) {
                a.distance = two_point_distance(a.x, character.x, a.y, character.y);
                a.x += (character.x - a.x) / (a.distance/a.speed);
                a.y += (character.y - a.y) / (a.distance/a.speed);
            }
            if(a.collision_damage === true) {
                if(a.attack === false) {
                    if(collision(a, character) || collision(character, a)) {
                        damage_text_list.push(new Damage_text(a.damage, character.x, character.y, get_random_value(-3, 3), true));
                        a.attack = true;
                        character.hp -= a.damage;
                    }
                }
                else {
                    a.attack_timer++;
                    if(a.attack_timer % Collision_delay === 0)
                        a.attack = false;
                }
            }
            if(a.ranged) {
                a.stop_timer++;
                if(a.stop_timer > Ranged_stop_time) {
                    a.default_speed = 0;
                    a.speed = 0;
                    a.stop = true;
                }
            }
            a.r_slow_time--;
            a.shoke_time--;
            if(a.r_slow_time > 0)
                a.speed_reduce += R_slow_amount;
            a.speed = (a.default_speed-a.speed_reduce > 0) ? a.default_speed-a.speed_reduce : 0;
            //체력바 위치
            monster_hp_bar_list[i].x = a.x;
            monster_hp_bar_list[i].y = a.y-a.height/3;
            monster_hp_bar_list[i].progress = a.hp;
            //처치
            if(a.hp <= 0) {
                character.exp += a.exp;
                a.death_ability();
                let num = 0;
                for(let i=0; i<SpawnList[stage].length; i++)
                    if(SpawnList[stage][i].monster == a.number) num = i;
                if(!check_kill_count(a.number, SpawnList[stage][num].objectCount))
                    kill_count_list[a.number]++;
                monster_hp_bar_list.splice(i, 1);
                harvestring();
                monster_list.splice(i--, 1);
            }
            a.draw();
        };
        
       for(let i=0; i<projectile_list.length; i++) {
            a = projectile_list[i];
            a.draw();
            a.x += a.x_speed;
            a.y += a.y_speed;
            if(collision(a, character)) {
                character.hp -= a.damage;
                a.ability();
                damage_text_list.push(new Damage_text(a.damage, character.x, character.y, get_random_value(-3, 3), true));
                projectile_list.splice(i--, 1);
            }
            else if(a.y < -100 || a.x > canvas.width || a.y > canvas.height || a.x < -100)
                projectile_list.splice(i--, 1);
        };
        shoke_image_list.forEach((a) => {
            a.draw();
        });
        shoke_image_list = [];
        
        monster_hp_bar_list.forEach((a) => {
            if(a.draw());
        });
        for (let i = 0; i < zone_list.length; i++) {
            if(!zone_list[i].draw()) i--;
        }

        for(let i=0; i<hit_image_list.length; i++) {
            a = hit_image_list[i];
            a.timer++;
            a.draw();
            if(a.timer > 10)
                hit_image_list.splice(i--, 1);
        }

        //< Damage Text >
        for(let i=0; i<damage_text_list.length; i++) {
            a = damage_text_list[i];
            a.timer++;
            a.draw();
            a.x += a.random_x;
            a.y -= a.gravity;
            a.gravity -= Damage_text_gravity_speed;
            if(a.timer > 20)
                damage_text_list.splice(i--, 1);
        }

        if(cooldown_list[2][0] > E_skill_cooldown-E_skill_effect_time/2)
            dead_whisper.draw(2, -60);

        //목표
        for(let i=0; i<SpawnList[stage].length; i++)
            set_spawn_time(SpawnList[stage][i].monster, SpawnList[stage][i].spawnTime);
        switch (mode) {
            case Battle:
                if(battle_object(stage)) set_stage(++stage);
                break;
            case Survival:
                if(survival_object(stage)) set_stage(++stage);
                break;
        }
        //< Main UI >
        ctx.fillStyle = "white";
        ctx.fillRect(Condition_ui_x+20, Condition_ui_y, 100, 150);
        ctx.drawImage(profile, Condition_ui_x+20, Condition_ui_y+20, 105, 105);
        hp_bar.progress = (character.hp >= 0) ? character.hp : 0;
        hp_bar.draw();
        mana_bar.progress = character.mana;
        mana_bar.draw();
        exp_bar.progress = character.exp;
        exp_bar.draw();
        condition_ui.draw();
        level.draw();
        if(!tutorial) {
            object_ui.draw();
            stage_ui.draw();
        }
        cooldown_bar_list.forEach((a, i) => {
            a.draw_background();
            skill_ui_list[i].draw();
            if(i === 1 && (character.mana < Q_skill_mana || character.level < 1 || (main_page === 2 && sub_page === 10)))
                a.draw_impossible();
            else if(i === 2 && (character.mana < E_skill_mana || character.level < 3))
                a.draw_impossible();
            else if(i === 3 && (character.mana < R_skill_mana || character.level < 5))
                a.draw_impossible();
            skill_key_list[i].draw();
        });
        //배경 이동
        document.body.style.backgroundPosition = -character.x/3+"px "+(-character.y)/3+"px";
    }
}
let hp_bar = new Condition_bar(Condition_ui_x+120, Condition_ui_y+45, Condition_ui_width*0.525, Condition_ui_height*0.2, Hp, Hp, "rgb(215,48,48)");
let mana_bar = new Condition_bar(Condition_ui_x+120, Condition_ui_y+80, Condition_ui_width*0.525, Condition_ui_height*0.2, Mana, Mana, "rgb(31, 135, 196)");
let exp_bar = new Condition_bar(Condition_ui_x+104, Condition_ui_y+110, Condition_ui_width*0.575, Condition_ui_height*0.1, next_exp, next_exp, "rgb(69, 201, 52)");
for(let i=0; i<4; i++) {
    skill_ui_list.push(new Skill_ui(Skill_ui_x+Skill_ui_interval*i, i));
    cooldown_bar_list.push(new Cooldown_bar(Cooldown_ui_x+Skill_ui_interval*i, i));
    skill_key_list.push(new Skill_key_ui(Skill_key_ui_x+Skill_ui_interval*i, i));
}
start_timer();
