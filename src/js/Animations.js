const Animations = {
  tween: ({
    scene,
    targets,
    changes,
    duration = 500,
    delay = 0,
    ease = "Sine.easeInOut",
    yoyo = false,
    loop = 0,
    cb
  }) => {
    const tweenOptions = {
      targets,
      ease,
      duration,
      delay,
      yoyo,
      loop,
      ...changes,
      onComplete: cb
    };
    return scene.tweens.add(tweenOptions);
  },
  bounce: ({ scene, targets }) => {
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      Animations.tween({
        scene,
        targets: target,
        yoyo: true,
        duration: 100,
        changes: {
          scale: (target.scale ? target.scale : 1) * 2,
          x: target.x - (target.width * target.scale) / 2,
          y: target.y - (target.height * target.scale) / 2
        }
      });
    }
  },
  animateBGColor: (scene, element, endColor, duration) => {
    const startColor = element.backgroundColor;

    const interval = 20;
    const steps = duration / interval;
    const step = 1.0 / steps;
    let time = 0.0;

    const timeEvent = scene.time.addEvent({
      delay: interval,
      callback: () => {
        if (time >= 1.0) {
          timeEvent.remove();
          timeEvent.destroy();
        }
        const r = parseInt(Animations.lerp(startColor.r, endColor.r, time));
        const g = parseInt(Animations.lerp(startColor.g, endColor.g, time));
        const b = parseInt(Animations.lerp(startColor.b, endColor.b, time));
        element.backgroundColor = Phaser.Display.Color.RGBStringToColor(
          `rgb(${r}, ${g}, ${b})`
        );
        time += step;
      },
      callbackScope: this,
      loop: true
    });
  },
  lerp: (a, b, u) => {
    return (1 - u) * a + u * b;
  }
};

module.exports = Animations;
