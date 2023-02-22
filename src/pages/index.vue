<script setup lang="ts">
import { drawCreditCard } from '~/babylon/creditcard'
import '@babylonjs/loaders'

const cardRef = ref<HTMLCanvasElement | null>(null)

const createScene = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas, true)

  const scene = new Scene(engine)
  engine.runRenderLoop(() => scene.render())

  return scene
}

const createCamera = (scene: InstanceType<typeof Scene>) => {
  const camera = new ArcRotateCamera(
    'camera',
    Math.PI / 3,
    Math.PI / 2.5,
    25,
    new Vector3(0, 1.3, 0),
    scene,
  )
  camera.attachControl(true)
  camera.useBouncingBehavior = true
}

onMounted(() => {
  const card = cardRef.value
  if (card) {
    const scene = createScene(card)
    createCamera(scene)

    drawCreditCard(scene)

    scene.createDefaultEnvironment({
      createSkybox: false,
      enableGroundMirror: false,
      groundYBias: 0,
    })
    scene.clearColor = new Color4(0, 0, 0, 0)
  }
})
</script>

<template>
  <canvas
    ref="cardRef"
    class="fixed"
    un-h="screen"
    un-w="screen"
  />
</template>

<style scoped>
</style>
