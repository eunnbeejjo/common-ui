<template>
  <v-container>
    <v-text-field placeholder="제목 입력해라"></v-text-field>
    <v-row>
      <v-col>
        <ckeditor v-model="value1" :editor="editor" @ready="onReady" style="height: 500px; border: 1px solid #ccc;"></ckeditor>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        카테고리
      </v-col>
      <v-col>
<!--        게시글 작성 시 카테고리 선택할 때에는 '전체' 항목 보여주지 않음 -->
        <v-combobox v-model="cateSelect" :items="categoriesGroup" placeholder="카테고리(최대 3개)" multiple
                    dense hide-details class="mr-2">
          <template v-slot:selection="{attrs, item, parent, selected}">
            <v-chip v-if="item === Object(item)" v-bind="attrs" :input-value="selected" small>
              <span>{{item.text}}</span>
              <v-icon @click="parent.selectItem(item)" small>mdi-close</v-icon>
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>파일 첨부</v-col>
      <v-col><v-file-input></v-file-input></v-col>
    </v-row>
    <v-row>
      <v-col><v-checkbox v-model="usePassword" label="비밀번호 사용" value="hasPassword"></v-checkbox></v-col>
      <v-col><v-text-field :disabled="!usePassword" v-model="password" type="password" placeholder="비밀번호 입력" autocomplete="new-password"></v-text-field></v-col>
    </v-row>
    <v-row>
      <v-col>댓글 사용 여부</v-col>
      <v-col>
        <v-radio-group v-model="commentAllow" row>
          <v-radio value="allowComment" label="댓글 허용"></v-radio>
          <v-radio value="noComment" label="댓글 허용 안함"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col>게시물 공개 여부</v-col>
      <v-col>
        <v-radio-group v-model="disclosurePost" row>
          <v-radio value="publicPost" label="공개"></v-radio>
          <v-radio value="privatePost" label="비공개"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="$router.push('/general-forum')">취소</v-btn>
        <v-btn @click="savePost">저장</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "../../router";
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import Ckeditor from '@ckeditor/ckeditor5-vue2';

export default {
  name: 'CreatePost',
  components: {
    'ckeditor': Ckeditor.component
  },
  data: () => ({
    commentAllow: 'allowComment',
    disclosurePost: 'publicPost',
    usePassword: false,
    password: null,

    value1: null,
    editor: DecoupledEditor,
    cateSelect: null,
    categoriesGroup: [
      { text: "스포츠" },
      { text: "게임" },
      { text: "공부" },
      { text: "업무" },
      { text: "카테고리이름이길수도있으니까" },
      { text: "세상은넓고카테고리는길다" },
      { text: "커피에얼음을퐁당퐁당" },
      { text: "동해물과백두산이마르고닳도록하느님이보우하사" },
    ],
  }),
  methods: {
    onReady( editor ) {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
    },
    savePost() {
      alert('저장되었습니다!');
      router.push('/general-forum')
    },
  },
}
</script>

<style></style>