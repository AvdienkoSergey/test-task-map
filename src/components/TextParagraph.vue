<template>
  <p v-html="textAfterSelection"></p>
</template>

<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { useLocale } from "vuetify";
const { t } = useLocale();
const props = defineProps({
  text: {
    type: String,
    require: true,
    default: "",
  },
  wordsToHighlight: {
    type: Object as PropType<string[]>,
    requred: false,
    deafault: [],
  },
});

function divideTextIntoSentencesWords(text: string) {
  return text.split(" ");
}

function divideTextIntoSentences(text: string) {
  return text.split(".");
}

function selection(text: string, specialWords: string[]) {
  return divideTextIntoSentencesWords(text)
    .reduce((acc: string[], cur: string) => {
      specialWords.includes(cur) ? acc.push(`<b>${cur}</b>`) : acc.push(cur);
      return acc;
    }, [])
    .join(" ");
}

const textAfterSelection = computed(() => {
  if (!props.wordsToHighlight || props.wordsToHighlight?.length === 0) {
    return `${t(props.text)}`;
  }
  const sourceText = `${t(props.text)}`;
  const wordsToHighlight = props.wordsToHighlight;
  return divideTextIntoSentences(sourceText)
    .map((sentence: string) => {
      return selection(sentence, wordsToHighlight);
    })
    .join(". ");
});
</script>

<style scoped></style>
