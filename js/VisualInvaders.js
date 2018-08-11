

// Aliases
let Container = PIXI.Container,
	autoDetectRenderer = PIXI.autoDetectRenderer,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	Sprite = PIXI.Sprite;

//images
let imgVs = 'images/visualStudio.png',
	imgVim = 'images/vim.png',
	imgNicholson = 'images/nichol.jpg',
	imgModelM = 'images/modelm.png';

let vs, vim, nicholson, modelm;     //used to store the actual pixi loaded image

let player, visstuds, projectile;
let vims = [];

let renderer = autoDetectRenderer(600, 600);
renderer.view.style.border = '1px solid black';
renderer.backgroundColor = 0x000000;


document.getElementById('pixiCanvas').appendChild(renderer.view);
let stage = new Container();
renderer.render(stage);

//load up the images
loader
    .add(imgVs)
    .add(imgVim)
    .add(imgNicholson)
    .add(imgModelM)
    .load(setup);

function setup() {
	vs = resources[imgVs].texture;
	vim = resources[imgVim].texture;
	nicholson = resources[imgNicholson].texture;
	modelm = resources[imgModelM].texture;

	player = new Sprite(nicholson);
	player.x = 50;
	player.vx = 0;
	player.y = 400;
	player.vy = 0;
	player.width=100;
	player.height = 100;
	stage.addChild(player);

	var x = 75, y = 540;
	for (var i = 0; i < 5; i++) {
		var vimTemp = new Sprite(vim);
		vimTemp.x = x;
		vimTemp.y = y;
		vimTemp.width = 50;
		vimTemp.height = 50;
		vims.push(vimTemp);
		stage.addChild(vimTemp);
		x+= 100;
	}

	var left = keyboard(37),
		right = keyboard(39);

	left.press = () => {
		player.vx = -5;
	};
	left.release = () => {
		player.vx = 0;
	};

	right.press=() => {
		player.vx = 5;
	};
	right.release = () => {
		player.vx = 0;
	};

	renderer.render(stage);
}

function gameLoop() {
	requestAnimationFrame(gameLoop);

	player.x += player.vx;
	player.y += player.vy;

	renderer.render(stage);
}

gameLoop();

function keyboard(keyCode) {
	var key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;

	key.downHandler = event => {
		if (event.keyCode === key.code) {
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
		}
		event.preventDefault();
	};

	key.upHandler = event => {
		if (event.keyCode == key.code) {
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
		}
		event.preventDefault();
	};

	window.addEventListener('keydown', key.downHandler.bind(key), false);
	window.addEventListener('keyup', key.upHandler.bind(key), false);

	return key;
}
