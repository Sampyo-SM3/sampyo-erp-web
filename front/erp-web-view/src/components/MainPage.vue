<template>
  <HeaderBar @menuSelected="handleMenuSelection" />
  <v-container fluid class="pt-0 pr-5 pl-5">
    <v-row no-gutters style="height: 100vh;">

      <!-- 사이드 메뉴 -->
      <v-col cols="auto" class="side-menu-col" style="height: 100vh;">
        <SideMenu ref="sideMenu" @menu-clicked="handleMenuClick" />
      </v-col>

      <!-- 실제 콘텐츠 -->
      <v-col class="content-area">
        <!-- 브레드크럼 및 제목 영역 css잘몰라서 강제로 위치맞춤..-->
        <div class="breadcrum-div d-flex align-center text-body-2 pl-0 pt-0 mt-2">

          <br><br><br>

          <!-- <v-icon size="small" class="mx-1">mdi-chevron-right</v-icon> -->
          <span class="menu-text-header">
            {{ savedMidMenu }} </span>
          <span class="menu-text-header"> <v-icon size="small" class="mx-1">mdi-chevron-right</v-icon> </span>
          <span class="menu-text-header"> {{ savedSubMenu }} </span>

          <template v-if="extraBreadcrumb">
            <span class="menu-text-header">
              <v-icon size="small" class="mx-1">mdi-chevron-right</v-icon>
            </span>
            <span class="menu-text-header">{{ extraBreadcrumb }}</span>
          </template>

          <v-btn v-if="listButtonLink" variant="text" color="primary" class="goBack-btn ml-auto mr-0" size="small"
            @click="$router.push(listButtonLink)">
            <span class="mdi mdi-menu" style="font-size: 16px; margin-top:1px;"></span>
            <span class="goBack-text">목록</span>
          </v-btn>
        </div>

        <!-- 메인 컨텐츠 영역 -->
        <v-main class="pt-0 pl-0 content-scrolls">
          <router-view></router-view>
        </v-main>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { ref, onMounted, provide } from 'vue';
import SideMenu from '@/components/SideMenu.vue';
import HeaderBar from '@/components/HeaderBar.vue';

export default {
  name: 'MainPage',
  components: {
    SideMenu,
    HeaderBar
  },
  setup() {
    const sideMenu = ref(null);
    // 반응형 변수로 선언
    const savedMidMenu = ref(null);
    const savedSubMenu = ref(null);

    const extraBreadcrumb = ref('');
    const listButtonLink = ref(null);

    provide('extraBreadcrumb', extraBreadcrumb);
    provide('listButtonLink', listButtonLink);

    // 로컬 스토리지 값을 확인하고 반응형 변수에 저장하는 함수
    const checkLocalStorage = () => {
      const midMenuFromStorage = localStorage.getItem('midMenu');
      const subMenuFromStorage = localStorage.getItem('subMenu');

      savedMidMenu.value = midMenuFromStorage ? JSON.parse(midMenuFromStorage) : null;
      savedSubMenu.value = subMenuFromStorage ? JSON.parse(subMenuFromStorage) : null;

      // console.log('메뉴 클릭 후 midMenu:', savedMidMenu.value);
      // console.log('메뉴 클릭 후 subMenu:', savedSubMenu.value);
    };

    // 초기 로드 시에도 값 확인
    onMounted(() => {
      checkLocalStorage();
    });

    const handleMenuClick = () => {
      // 메뉴 클릭 후 약간의 지연을 주어 로컬 스토리지가 업데이트될 시간을 확보
      setTimeout(() => {
        checkLocalStorage();
      }, 100);
    };

    const handleMenuSelection = (headerCode) => {
      // console.log('Header menu selected:', headerCode);
      setTimeout(() => {
        if (sideMenu.value) {
          sideMenu.value.activateFirstSubmenuByHeader(headerCode);
        }
      }, 300);
    };

    // 템플릿에서 사용할 수 있도록 변수 반환
    return {
      sideMenu,
      handleMenuSelection,
      handleMenuClick,
      savedMidMenu,  // 템플릿에서 사용하기 위해 반환
      savedSubMenu,   // 템플릿에서 사용하기 위해 반환
      extraBreadcrumb,
      listButtonLink
    };
  }
}
</script>

<style scoped>
.menu-text-header {
  font-size: 24px;
  color: #66686A;
}

.menu-text {
  font-size: 12px;
  color: #A1A6A6;
}

.goBack-text {
  font-size: 15px;
  font-weight: 500;
  margin-left: 3px;
}
</style>