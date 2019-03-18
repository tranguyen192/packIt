export default class Items {
  constructor(gender, kindOfTrip) {
    this.generalItems = {}
    this.activities = []
    this.accomodation = {}
    this.transportation = {}
    this.other = {}
    this.toDos = []

    if (gender === 'unisex') {
      const unisexGeneral = require('../json/unisex/unisex_general.json')
      this.generalItems = unisexGeneral

      if (kindOfTrip.includes('business')) {
        const unisexBusinessActivities = require('../json/unisex/unisex_business_activities.json')
        this.activities = this.activities.concat(unisexBusinessActivities)
      }
      if (kindOfTrip.includes('leisure')) {
        const unisexLeisureActivities = require('../json/unisex/unisex_leisure_activities.json')
        this.activities = this.activities.concat(unisexLeisureActivities)
      }
    }

    if (gender === 'male') {
      const unisexGeneral = require('../json/unisex/unisex_general.json')
      const maleGeneral = require('../json/male/male_general.json')
      this.generalItems = unisexGeneral.concat(maleGeneral)

      if (kindOfTrip.includes('business')) {
        const unisexBusinessActivities = require('../json/unisex/unisex_business_activities.json')
        const maleBusinessActivities = require('../json/male/male_business_activities.json')
        this.activities = this.activities
          .concat(unisexBusinessActivities)
          .concat(maleBusinessActivities)
      }
      if (kindOfTrip.includes('leisure')) {
        const unisexLeisureActivities = require('../json/unisex/unisex_leisure_activities.json')
        const maleLeisureActivities = require('../json/male/male_leisure_activities.json')
        this.activities = this.activities
          .concat(unisexLeisureActivities)
          .concat(maleLeisureActivities)
      }
    }

    if (gender === 'female') {
      const unisexGeneral = require('../json/unisex/unisex_general.json')
      const femaleGeneral = require('../json/female/female_general.json')
      this.generalItems = unisexGeneral.concat(femaleGeneral)

      if (kindOfTrip.includes('business')) {
        const unisexBusinessActivities = require('../json/unisex/unisex_business_activities.json')
        const femaleBusinessActivities = require('../json/female/female_business_activities.json')
        this.activities = this.activities
          .concat(unisexBusinessActivities)
          .concat(femaleBusinessActivities)
      }
      if (kindOfTrip.includes('leisure')) {
        const unisexLeisureActivities = require('../json/unisex/unisex_leisure_activities.json')
        const femaleLeisureActivities = require('../json/female/female_leisure_activities.json')
        this.activities = this.activities
          .concat(unisexLeisureActivities)
          .concat(femaleLeisureActivities)
      }
    }

    const componentsAccomodation = require('../json/components/components_accomodation.json')
    this.accomodation = componentsAccomodation

    const componentsTransportation = require('../json/components/components_transportation.json')
    this.transportation = componentsTransportation

    const componentsOther = require('../json/components/components_other.json')
    this.other = componentsOther

    const toDos = require('../json/to_dos.json')
    this.toDos = toDos
  }

  getGeneralItems() {
    return this.generalItems
  }
  getActivities() {
    return this.activities
  }
  getComponentsActivities() {
    return this.getComponents(this.activities).sort()
  }
  getAccomodation() {
    return this.accomodation
  }
  getComponentsAccomodation() {
    return this.getComponents(this.accomodation).sort()
  }
  getTransportation() {
    return this.transportation
  }
  getComponentsTransportation() {
    return this.getComponents(this.transportation).sort()
  }
  getOther() {
    return this.other
  }
  getComponentsOther() {
    return this.getComponents(this.other).sort()
  }
  getToDos() {
    return this.toDos
  }
  getVaryingItems() {
    return this.activities
      .concat(this.accomodation)
      .concat(this.transportation)
      .concat(this.other)
  }

  getComponents(array) {
    let components = []
    for (let i = 0; i < array.length; i++) {
      if (!components.includes(array[i].component)) {
        components.push(array[i].component)
      }
    }
    return components
  }
}
