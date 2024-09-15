<template>
  <article class="article">
    <text-title :titleType="1" :titleText="'$vuetify.article.title_h1'" />
    <text-paragraph
      :text="'$vuetify.article.introduction'"
      :wordsToHighlight="[
        'Vuejs,',
        'Vuex,',
        'VueRouter,',
        'Vuetify',
        'Карта',
        'задании',
        'Мапа',
        'задатку',
        'Task',
        'Map',
      ]"
    />
    <text-title
      :titleType="3"
      :titleText="'$vuetify.article.section_1.title_h2'"
    />
    <text-paragraph :text="'$vuetify.article.section_1.content'" />
    <text-title
      :titleType="3"
      :titleText="'$vuetify.article.section_2.title_h2'"
    />
    <text-paragraph :text="'$vuetify.article.section_2.content'" />
    <ol class="number" type="1">
      <li>
        <text-paragraph
          :text="'$vuetify.article.section_2.list.point_1.text'"
        />
        <ol class="letter" type="a">
          <li>
            <text-paragraph
              :text="'$vuetify.article.section_2.list.point_1.list.point_a'"
            />
            <a src="https://geocode.maps.co/" target="_blank">
              https://geocode.maps.co/
            </a>
          </li>
          <li>
            <text-paragraph
              :text="'$vuetify.article.section_2.list.point_1.list.point_b'"
            />
          </li>
        </ol>
      </li>
      <li>
        <text-paragraph :text="'$vuetify.article.section_2.list.point_2'" />
      </li>
      <li>
        <text-paragraph :text="'$vuetify.article.section_2.list.point_3'" />
      </li>
      <li>
        <text-paragraph :text="'$vuetify.article.section_2.list.point_4'" />
      </li>
      <li>
        <text-paragraph :text="'$vuetify.article.section_2.list.point_5'" />
      </li>
    </ol>
    <text-paragraph :text="'$vuetify.article.section_2.summary'" />
    <text-title
      :titleType="4"
      :titleText="'$vuetify.article.section_3.title_h2'"
    />
    <ol class="number" type="1">
      <li>
        <text-paragraph :text="'$vuetify.article.section_3.list.point_1'" />
      </li>
      <li>
        <text-paragraph :text="'$vuetify.article.section_3.list.point_2'" />
      </li>
      <li>
        <text-paragraph
          :text="'$vuetify.article.section_3.list.point_3'"
          :wordsToHighlight="['jest']"
        />
      </li>
    </ol>
    <text-paragraph
      :text="'$vuetify.article.section_4.text'"
      :wordsToHighlight="['Напоминание:']"
    />
    <text-paragraph :text="'$vuetify.article.section_5.text'" />
    <v-img aspect-ratio="16/9" cover src="/image.png"></v-img>
  </article>
</template>

<script setup lang="ts">
import TextTitle from "@/components/TextTitle.vue";
import TextParagraph from "@/components/TextParagraph.vue";
</script>

<style scoped>
.article {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
ol {
  list-style-type: initial;
  margin-left: 20px;
  margin-bottom: 8px;
}

ol.number {
  list-style-type: decimal;
}
ol.letter {
  list-style-type: lower-latin;
}
a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
