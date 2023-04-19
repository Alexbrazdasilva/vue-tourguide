import VBTour from '@/components/VBTour.vue'

/**
 * Installer for plugin
 * @type {{ install: import('vue').Plugin }}
 */
export default {
  install(app, options) {
    app.component(VBTour.name, VBTour)
    return app
  },
}
