export default {
  hello: "Здраво",
  header: {
    title: "Тестни задатак",
    tabs: {
      task: "О задатку",
      map: "Мапа",
    },
    dropdown: {
      ru: "Руски",
      srCyrl: "Српски",
      en: "Енглески",
    },
  },
  article: {
    title_h1: "Тестни задатак SquareGPS",
    introduction: `Потребно је помоћу Vuejs, Vuex, VueRouter, Vuetify написати апликацију. Хеадер
    апликације треба да садржи мени од 2 ставке: О задатку и Мапа. У главном
    делу апликације треба да се приказује садржај секција`,
    section_1: {
      title_h2: "Секција “О задатку”",
      content: "У секцији треба да буде текст овог задатка, разврстан слично",
    },
    section_2: {
      title_h2: "Секција “Мапа”",
      content: "На екрану треба да буду мапа и списак (види пример):",
      list: {
        point_1: {
          text: `При клику на дугме за додавање, мапа треба да пређе у режим додавања
          маркера: на месту клика треба да се појави маркер, а у списку - записа са адресом
          тачке`,
          list: {
            point_a: `За претрагу адресе можете користити било који бесплатан API за
            геокодирање, на пример: `,
            point_b: `Уколико адреса није пронађена, потребно је приказати грешку и не
            додавати маркер у списак`,
          },
        },
        point_2: "При клику на маркер треба да се осветли запис у списку",
        point_3:
          "При клику на запис у списку мапа треба да се центрише на маркеру",
        point_4:
          "Маркер треба да буде локално похрањен и да не нестане после поновног учитавања странице",
        point_5: "У адресној траци треба да се приказује id изабраног маркера",
      },
      summary: `Локално складиштење података треба да буде организовано као сервис,
      који имитира бекенд. (Потребан је клас Backend који псевдо-асинхроно
      чува податке у localStorage)
      `,
    },
    section_3: {
      title_h2: "Додатно:",
      list: {
        point_1: `Размислите о приказу на мобилним уређајима`,
        point_2: `Предвидети локализацију`,
        point_3: `Потребно је помоћу jest написати 1 модуларни тест за било који компонент`,
      },
    },
    section_4: {
      text: `Подсећање: тестни задатак има за циљ да покаже способност писања доброг
      модуларног кода, као и коришћење наведених технологија и не само тога.
      Овим кодом треба да се поносите.`,
    },
    section_5: {
      text: "Пример:",
    },
  },
};
