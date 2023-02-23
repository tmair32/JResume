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
    -Math.PI / 1.5,
    Math.PI / 2.5,
    25,
    new Vector3(0, 0, 0),
    scene,
  )
  camera.useBouncingBehavior = true

  camera.lowerRadiusLimit = 15
  camera.upperRadiusLimit = 30
  camera.lowerBetaLimit = Math.PI / 2.5
  camera.upperBetaLimit = Math.PI / 1.5
}

onMounted(() => {
  const card = cardRef.value
  if (card) {
    const scene = createScene(card)
    createCamera(scene)

    drawCreditCard(scene)

    scene.createDefaultEnvironment({
      createSkybox: false,
      createGround: false,
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
