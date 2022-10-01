import { Graphics, RenderTexture, Sprite, ParticleContainer } from "pixi.js";

import { hex2num, deg2rad } from "@/utils/converter";

type CreateGridProps = {
  width: number;
  height: number;
  rotation: number;
};

const WIDTH = 170;
const HEIGHT = 28;

export const createGrid = ({
  width,
  height,
  rotation,
}: CreateGridProps): ParticleContainer => {
  const grid = new ParticleContainer(100, {
    position: true,
    rotation: true,
  });

  grid.pivot.x = width / 2;
  grid.pivot.y = height / 2;
  grid.x = width / 2;
  grid.y = height / 2;
  grid.rotation = deg2rad(rotation);
  return grid;
};

type CreateGraphicProps = {
  width: number;
  height: number;
  color: string;
};

export const createGraphic = ({
  width,
  height,
  color,
}: CreateGraphicProps): Graphics => {
  const rect = new Graphics();
  rect.beginFill(hex2num(color));
  rect.drawRect(0, 0, width / WIDTH, height / HEIGHT);
  rect.endFill();
  return rect;
};

type CreateSpriteProps = {
  index: number;
  countSquare: number;
  width: number;
  height: number;
  texture: RenderTexture;
};

export const createSprite = ({
  index,
  countSquare,
  width,
  height,
  texture,
}: CreateSpriteProps): Sprite => {
  const col = index % countSquare;
  const row = Math.floor(index / countSquare);
  const scaleX = width / countSquare;
  const scaleY = height / countSquare;

  const sprite = new Sprite(texture);
  sprite.anchor.set(0.5, 0.5);
  sprite.x = col * scaleX + scaleX / 2 + texture.width / 2;
  sprite.y = row * scaleY + scaleX / 2 + texture.height / 2;

  return sprite;
};

type CreateCellsProps = {
  count: number;
  width: number;
  height: number;
  texture: RenderTexture;
};

export const createCells = ({
  texture,
  width,
  height,
  count,
}: CreateCellsProps): Sprite[] => {
  const list = [];
  const countSquare = Math.floor(Math.sqrt(count));

  for (let index = 0; index < count; index++) {
    const sprite = createSprite({ index, countSquare, width, height, texture });
    list.push(sprite);
  }

  return list;
};

export const animeCell = (cell: Sprite) => {
  return () => {
    const dir = Math.sign(Math.random() - 0.5);

    cell.rotation = dir * Math.random();
  };
  // return anime({
  //   targets: cell,
  //   rotation: Math.random() * dir,
  //   direction: "alternate",
  //   loop: true,
  //   autoplay: false,
  //   easing: "steps(2)",
  // });
};
