export default {
  hello: "Hello",
  header: {
    title: "Test Assignment",
    tabs: {
      task: "About the Task",
      map: "Map",
    },
    dropdown: {
      ru: "Russian",
      srCyrl: "Serbian",
      en: "English",
    },
  },
  article: {
    title_h1: "Test Assignment SquareGPS",
    introduction: `You need to create an application using Vuejs, Vuex, VueRouter, and Vuetify. The header
    of the application should contain a menu with 2 items: About the Task and Map. The main
    part of the application should display the content of the sections`,
    section_1: {
      title_h2: "Section “About the Task”",
      content:
        "The section should contain the text of this assignment, formatted similarly",
    },
    section_2: {
      title_h2: "Section “Map”",
      content: "The screen should display a map and a list (see example):",
      list: {
        point_1: {
          text: `When clicking the add button, the map should switch to marker addition mode:
          a marker should appear at the click location, and a record with the address of the
          point should be added to the list`,
          list: {
            point_a: `To find the address, you can use any free geocoding API, for example: `,
            point_b: `If the address is not found, an error should be displayed and the
            marker should not be added to the list`,
          },
        },
        point_2:
          "Clicking on a marker should highlight the corresponding record in the list",
        point_3:
          "Clicking on a record in the list should center the map on the marker",
        point_4:
          "Markers should be stored locally and should not disappear after a page reload",
        point_5: "The URL bar should display the id of the selected marker",
      },
      summary: `Local data storage should be organized as a service
      emulating a backend. (A Backend class is needed that pseudo-asynchronously
      saves data in localStorage)
      `,
    },
    section_3: {
      title_h2: "Additional:",
      list: {
        point_1: `Consider mobile device display`,
        point_2: `Provide localization`,
        point_3: `Write 1 unit test for any component using jest`,
      },
    },
    section_4: {
      text: `Reminder: the test assignment is intended to demonstrate the ability to write good
      modular code, as well as the ability to use the specified technologies and more.
      This code should be a source of pride.`,
    },
    section_5: {
      text: "Example:",
    },
  },
};
