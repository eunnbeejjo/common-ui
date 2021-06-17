<template>
  <v-container>
    <v-text-field v-model="title" placeholder="제목 입력해라" maxlength="30"></v-text-field>
    <v-row>
      <v-col>
        <ckeditor v-model="contents" :editor="editor" @ready="onReady" style="height: 500px; border: 1px solid #ccc; border-top: none;"></ckeditor>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        카테고리
      </v-col>
      <v-col>
        <v-combobox v-model="cateSelect" :items="cateGroup" placeholder="카테고리(최대 3개)" multiple
                    dense hide-details class="mr-2">
          <template v-slot:selection="{attrs, item, parent, selected}">
            <v-chip v-if="item === Object(item)" v-bind="attrs" :input-value="selected" small>
              <span>{{ item.text }}</span>
              <v-icon @click="parent.selectItem(item)" small>mdi-close</v-icon>
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col><v-checkbox v-model="attachmentsFlag" true-value="Y" false-value="N" label="파일 첨부"></v-checkbox></v-col>

      <v-col>
        <!-- v-chip v-for="a in filetest" :key="a" v-if="filetest[a]!==null" close @click:close="filetest[a] = null">
          {{ filetest[a].attachmentsName }}({{ Math.round(filetest[a].size/100)/10 }} kB)
        </v-chip -->

<!--        <v-chip v-if="filename1!==null" close @click:close="filename1 = null">
          {{ filename1.attachmentsName }}({{ Math.round(filename1.size/100)/10 }} kB)
        </v-chip>
        <v-chip v-if="filename2!==null" close @click:close="filename2 = null">
          {{ filename2.attachmentsName }}({{ Math.round(filename2.size/100)/10 }} kB)
        </v-chip>
        <v-chip v-if="filename3!==null" close @click:close="filename3 = null">
          {{ filename3.attachmentsName }}({{ Math.round(filename3.size/100)/10 }} kB)
        </v-chip>-->

        <v-file-input :disabled="attachmentsFlag === 'N'" @change="selectFile1"
                      counter show-size truncate-length="50">
        </v-file-input>
        <v-file-input :disabled="attachmentsFlag === 'N'" @change="selectFile2"
                      counter chips show-size truncate-length="50">
        </v-file-input>
        <v-file-input :disabled="attachmentsFlag === 'N'" @change="selectFile3"
                      counter chips show-size truncate-length="50">
        </v-file-input>
      </v-col>

    </v-row>
    <v-row>
      <v-col><v-checkbox v-model="pwActiveFlag" true-value="Y" false-value="N" label="비밀번호 사용"></v-checkbox></v-col>
      <v-col><v-text-field maxlength="20" :disabled="pwActiveFlag === 'N'" v-model="password" type="password" placeholder="비밀번호 입력" autocomplete="new-password"></v-text-field></v-col>
    </v-row>
    <v-row>
      <v-col>댓글 사용 여부</v-col>
      <v-col>
        <v-checkbox v-model="commentFlag" true-value="Y" false-value="N" label="댓글 허용"></v-checkbox>
      </v-col>
      <v-col>게시물 공개 여부</v-col>
      <v-col>
        <v-checkbox v-model="privateFlag" true-value="Y" false-value="N" label="비공개"></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="$router.push('/post')">취소</v-btn>
        <v-btn @click="updateBoard">저장</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "../../router";
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/ko';
import Ckeditor from '@ckeditor/ckeditor5-vue2';

export default {
  name: 'UpdatePost',
  components: {
    ckeditor: Ckeditor.component,
  },
  data: () => ({
    title: '',
    contents: '',

    commentFlag: '',
    privateFlag: '',
    pwActiveFlag: '',
    password: '',
    filename1: null,
    filename2: null,
    filename3: null,
    filetest: [],

    attachments: [],
    attachmentsFlag: 'N',

    fileName: null,

    categoryId: [],
    cateSelectedValue: '',

    editor: DecoupledEditor,
    cateSelect: [],
    cateGroup: [{}],

    rules: {
      required: value => !!value || '필수 입력 항목입니다.',
      titleCounter: value => value.length <= 30 || '최대 30자 이내로 작성해주세요',
      pwCounter: value => value.length <= 20 || '비밀번호는 최대 20자까지 설정 가능합니다.'
    },
  }),
  watch: {
    cateSelect (val) {
      if(val.length > 3) {
        this.$nextTick(() => this.cateSelect.pop());
        alert('카테고리는 3개까지 추가 가능합니다!');
      }
      this.cateSelectedValue = this.cateSelect.map(value => value.value);
    },
    attachmentsFlag() {
      if(this.attachmentsFlag === "N") {
        // this.filename1 = null;
        // this.filename2 = null;
        // this.filename3 = null;
        for(let a in this.filetest) {
          this.filetest[a] = null;
        }
      }
    },
  },
  mounted() {
    this.getCategoryList();
    this.getBoardDetail();
  },
  methods: {
    onReady( editor ) {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
    },
    // 카테고리 List 조회
    getCategoryList() {
      this.$store.dispatch("boardStore/getCategoryList", {
      }).then(response => {
        this.cateGroup = response.data.list;
        this.cateGroup = this.cateGroup.map(function (obj) {
          obj['text'] = obj['categoryName'];
          obj['value'] = obj['categoryId'];
          delete obj['categoryName'];
          delete obj['categoryId'];
          return obj;
        })
        this.cateGroup.splice(0, 1);
      })
    },
    getBoardDetail() {
      this.$store.dispatch("boardStore/getBoardDetail", {
        boardId: this.$route.query.boardId,
        userId: 1,
      }).then(response => {
        console.log(response, 'get post detail');
        let originDetail = response.data;
        this.title = originDetail.title;
        this.contents = originDetail.contents;
        this.pwActiveFlag = originDetail.pwActiveFlag;
        this.password = originDetail.password;
        this.attachmentsFlag = originDetail.attachmentsFlag;
        this.privateFlag = originDetail.privateFlag;
        this.categoryId = originDetail.categoryId;
        this.commentFlag = originDetail.commentFlag;
        this.boardId = originDetail.boardId;
        this.filetest = originDetail.attachments;
        this.filename1 = originDetail.attachments[0];
        this.filename2 = originDetail.attachments[1];
        this.filename3 = originDetail.attachments[2];
      })
    },
    onClickFileUpload() {
      this.$refs.fileInput.click();
    },
    onChangeFile(e) {
      console.log(e.target.files);
      const fileName = e.target.files[0].name;
      console.log(fileName, 'file name');
      this.fileName = fileName;
    },
    selectFile1(file) {
      this.file1 = file;
    },
    selectFile2(file) {
      this.file2 = file;
    },
    selectFile3(file) {
      this.file3 = file;
    },
    updateBoard() {
      if(this.title === '') {
        alert('제목을 입력하세요');
      } else if(this.contents === '') {
        alert('내용을 입력하세요');
      } else if(this.cateSelectedValue === '' || this.cateSelectedValue.length === 0) {
        alert('카테고리를 최소 1개 선택해주세요')
      } else if(this.pwActiveFlag === 'Y' && this.password === '') {
        alert('사용할 비밀번호를 입력해주세요');
      } else {
        this.$store.dispatch("boardStore/updateBoard", {
          userId: 1,
          boardId: this.$route.query.boardId,
          title: this.title,
          contents: this.contents,
          pwActiveFlag: this.pwActiveFlag,
          password: this.password,
          attachmentsFlag: this.attachmentsFlag,
          privateFlag: this.privateFlag,
          categoryId: this.cateSelectedValue,
          commentFlag: this.commentFlag,
        }).then(response => {
          console.log(response, 'update response');
          if(response.data.attachmentsFlag === "Y") {
            // upload multiple files
            let formData = new FormData();
            formData.append("files", this.file1);
            formData.append("files", this.file2);
            formData.append("files", this.file3);
            let data = {
              params: {
                boardId: response.data.boardId,
              },
              formData
            }
            this.$store.dispatch("boardStore/uploadMultipleFiles", data)
                .then(response => {
                  console.log(response, 'update response with attachments');
                })
                .catch(error => {
                  console.log('error', error);
                })
          } else if(response.data.attachmentsFlag === "N") {
            console.log(response, 'update response without attachments');
          }
          alert('저장되었습니다!');
          router.push({ path: '/post/'+1, query: { boardId: response.data.boardId } })
        }).catch(error => {
          console.log(error, 'error')
        })
      }
    },
  },
}
</script>