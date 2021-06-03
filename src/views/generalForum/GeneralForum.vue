<template>
<v-sheet>
  <v-row>
    <v-col cols="12">
      <v-card class="pa-5" elevation="0">
        <v-card-title class="text-h3 mb-5">게시판</v-card-title>
        <v-row>
          <v-col cols="3">
            <v-select v-model="searchDefault" :items="search" dense hide-details style="width: 100px; float: left" class="mr-2"></v-select>
            <v-text-field dense hide-details placeholder="검색어 입력" style="width: 200px; float: left"></v-text-field>
          </v-col>
          <v-col>
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
          <v-col cols="1">
            <v-btn>조회</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table :headers="headers" :items="desserts" multi-sort :sort-desc="[false, true]"
                          :page.sync="page" :items-per-page="itemsPerPage" @page-count="pageCount = $event"
                          @click:row="rowHasPw">
              <template v-slot:item.name="{item}">
                <span>{{ item.name }}</span>
                <v-icon v-if="item.hasFile === true" small class="ml-1">mdi-paperclip</v-icon>
                <v-icon v-if="item.hasPw === true" small class="ml-1">mdi-lock</v-icon>
              </template>
            </v-data-table>
            <v-card-actions class="justify-center px-10">
              <v-pagination v-model="page" :length="pageCount"/>
              <v-select :value="itemsPerPage" label="게시글 표시 갯수" :items="pageGroup" @input="itemsPerPage = parseInt($event, 10)" hide-details></v-select>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="$router.push('/create-post')">게시물 작성</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</v-sheet>
</template>

<script>
import router from "../../router";

export default {
  name: 'GeneralForum',
  watch: {
    cateSelect (val) {
      if(val.length > 3) {
        this.$nextTick(() => this.cateSelect.pop());
        alert('카테고리는 3개까지 검색 가능합니다!');
      }
    }
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      pageGroup: [5, 10, 15, 20],
      cateSelect: [],
      searchDefault: "전체",
      search: ["전체", "작성자", "제목", "댓글"],
      categoriesGroup: [
        { text: "전체" },
        { text: "스포츠" },
        { text: "게임" },
        { text: "공부" },
        { text: "업무" },
        { text: "카테고리이름이길수도있으니까" },
        { text: "세상은넓고카테고리는길다" },
        { text: "커피에얼음을퐁당퐁당" },
        { text: "동해물과백두산이마르고닳도록하느님이보우하사" },
      ],

      headers: [
        { text: '카테고리', align: 'start', sortable: false, value: 'categories', width: 100},
        { text: '제목', sortable: false, value: 'name', width: 200 },
        { text: '헤더1', value: 'calories' },
        { text: '헤더2', value: 'fat' },
        { text: '헤더헤더', value: 'carbs' },
        { text: '헤에에에더', value: 'protein' },
        { text: '헤헤헤히호호호', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          hasFile: true,
          isPublic: true,
          hasPw: true,
          categories: ['카테고리1', '카테고리가길다면', '아길다길어'],
          calories: 200,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          hasFile: false,
          isPublic: true,
          hasPw: true,
          categories: ['A', 'B'],
          calories: 200,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          hasFile: true,
          isPublic: false,
          hasPw: true,
          categories: ['B', 'C'],
          calories: 300,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          hasFile: true,
          isPublic: true,
          hasPw: false,
          categories: ['A', 'C'],
          calories: 300,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 400,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 400,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 400,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 400,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 500,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 500,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'Frozen Yogurt',
          calories: 200,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 200,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 300,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 300,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 400,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 400,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 400,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 400,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 500,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 500,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
        {
          name: 'Frozen Yogurt',
          calories: 200,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 200,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 300,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 300,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 400,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 400,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 400,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 400,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 500,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 500,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
  mounted() {
    let tables = document.getElementsByTagName('table');
    for (let i=0; i<tables.length;i++){
      resizableGrid(tables[i]);
    }

    function resizableGrid(table) {
      let row = table.getElementsByTagName('tr')[0],
          cols = row ? row.children : undefined;
      if (!cols) return;

      table.style.overflow = 'hidden';

      let tableHeight = table.offsetHeight;

      for (let i = 0; i < cols.length; i++) {
        let div = createDiv(tableHeight);
        cols[i].appendChild(div);
        cols[i].style.position = 'relative';
        setListeners(div);
      }

      function setListeners(div) {
        let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

        div.addEventListener('mousedown', function (e) {
          curCol = e.target.parentElement;
          nxtCol = curCol.nextElementSibling;
          pageX = e.pageX;

          let padding = paddingDiff(curCol);

          curColWidth = curCol.offsetWidth - padding;
          if (nxtCol)
            nxtColWidth = nxtCol.offsetWidth - padding;
        });

        div.addEventListener('mouseover', function (e) {
          e.target.style.borderRight = '2px solid #0000ff';
        })

        div.addEventListener('mouseout', function (e) {
          e.target.style.borderRight = '';
        })

        document.addEventListener('mousemove', function (e) {
          if (curCol) {
            let diffX = e.pageX - pageX;

            if (nxtCol)
              nxtCol.style.width = (nxtColWidth - (diffX)) + 'px';

            curCol.style.width = (curColWidth + diffX) + 'px';
            console.log('curCol: ', curColWidth + diffX, 'nxtCol: ', nxtColWidth - (diffX));

            // let curColWidthDiff = curColWidth + diffX;
            // let nxtColWidthDiff = nxtColWidth - (diffX);
            localStorage.setItem('curColWidthDiff', curColWidth + diffX);
          }
        });

        document.addEventListener('mouseup', function () {
          curCol = undefined;
          nxtCol = undefined;
          pageX = undefined;
          nxtColWidth = undefined;
          curColWidth = undefined;
          // console.log('culCol: ', curCol, 'nxtCol: ', nxtCol, 'pageX: ', pageX, 'nxtColWidth: ', nxtColWidth, 'curColWidth: ', curColWidth);
        });
      }

      function createDiv(height) {
        let div = document.createElement('div');
        div.style.top = 0;
        div.style.right = 0;
        div.style.width = '5px';
        div.style.position = 'absolute';
        div.style.cursor = 'col-resize';
        div.style.userSelect = 'none';
        div.style.height = height + 'px';
        return div;
      }

      function paddingDiff(col) {

        if (getStyleVal(col, 'box-sizing') == 'border-box') {
          return 0;
        }

        let padLeft = getStyleVal(col, 'padding-left');
        let padRight = getStyleVal(col, 'padding-right');
        return (parseInt(padLeft) + parseInt(padRight));

      }

      function getStyleVal(elm, css) {
        return (window.getComputedStyle(elm, null).getPropertyValue(css))
      }
    }
  },
  methods: {
    rowHasPw(row) {
      const tr = this.desserts.indexOf(row);
      if(this.desserts[tr].hasPw === true) {
        router.push('/post-pw')
      } else {
        router.push('/post')
      }
    },
  },
}
</script>

<style>
tr > td {
  max-width: 1px;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
th, td {
  border-right: 1px solid transparent;
}
</style>