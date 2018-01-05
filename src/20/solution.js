const parseInput = input =>
  input.split('\n').map((line, idx) => {
    const re = /^p=<(.*?),(.*?),(.*?)>, v=<(.*?),(.*?),(.*?)>, a=<(.*?),(.*?),(.*?)>$/;
    const [, px, py, pz, vx, vy, vz, ax, ay, az] = line.match(re);
    return {
      pos: { x: Number(px), y: Number(py), z: Number(pz) },
      vel: { x: Number(vx), y: Number(vy), z: Number(vz) },
      acc: { x: Number(ax), y: Number(ay), z: Number(az) },
      distance: Number(px) ** 2 + Number(py) ** 2 + Number(pz) ** 2,
      idx,
    };
  });

const moveParticle = p => {
  p.vel.x += p.acc.x;
  p.vel.y += p.acc.y;
  p.vel.z += p.acc.z;
  p.pos.x += p.vel.x;
  p.pos.y += p.vel.y;
  p.pos.z += p.vel.z;
  p.distance = p.pos.x ** 2 + p.pos.y ** 2 + p.pos.z ** 2;
};

const computeCollisions = particles => {
  const collisions = new Set();
  for (let i = 0; i < particles.length - 1; i += 1) {
    const particle = particles[i];
    const nextParticle = particles[i + 1];

    if (particle.distance !== nextParticle.distance) continue;
    if (particle.pos.x !== nextParticle.pos.x) continue;
    if (particle.pos.y !== nextParticle.pos.y) continue;
    if (particle.pos.z !== nextParticle.pos.z) continue;

    // Both particles collides
    collisions.add(i);
    collisions.add(i + 1);
  }
  return collisions;
};

const deleteCollisions = (particles, collisions) => {
  collisions.forEach(idx => {
    delete particles[idx];
  });
  // Remove holes
  return particles.filter(p => p !== undefined);
};

module.exports.challenge1 = input => {
  const particles = parseInput(input);

  particles.sort((a, b) => {
    const magnitudeA = a.acc.x ** 2 + a.acc.y ** 2 + a.acc.z ** 2;
    const magnitudeB = b.acc.x ** 2 + b.acc.y ** 2 + b.acc.z ** 2;
    return magnitudeA - magnitudeB;
  });

  return particles[0].idx;
};

module.exports.challenge2 = input => {
  let particles = parseInput(input);

  let ticksWithoutCollisions = 0;
  while (ticksWithoutCollisions < 50) {
    particles.forEach(moveParticle);
    particles.sort((a, b) => a.distance - b.distance);
    const collisions = computeCollisions(particles);
    particles = deleteCollisions(particles, collisions);

    if (collisions.size === 0) ticksWithoutCollisions += 1;
    else ticksWithoutCollisions = 0;
  }
  return particles.length;
};
