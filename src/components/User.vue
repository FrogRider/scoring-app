<template>
  <div
    class="user"
    :class="{
      user__outlined: criticalLimit(user.points),
      user__crown: hasCrown,
    }"
  >
    <p class="user__title">
      {{ user.name }}: {{ user.points }}
    </p>
    <div class="user__adminButtons">
      <div class="user__togglePointsDirection">
        <div
          class="user__togglePointsDirectionItem user__togglePointsDirectionItem_plus"
          :class="{active: plusPointsActive}"
          @click="plusMinus(true)"
        >
          <Icon icon="akar-icons:plus" />
        </div>
        <div
          class="user__togglePointsDirectionItem user__togglePointsDirectionItem_minus"
          :class="{active: !plusPointsActive}"
          @click="plusMinus(false)"
        >
          <Icon icon="akar-icons:minus" />
        </div>
      </div>
      <div class="user__addPoints">
        <input
          placeholder="Введите баллы"
          class="input"
          type="number"
          v-model="pointsToChange"
          v-on:keyup.enter="acceptChangePoints()"
        >
        <div
          class="button button_accept button_ml10"
          :class="{button_disabled: !isAdmin}"
          @click="acceptChangePoints()"
        >
          {{ longButtonTitle }}
        </div>
      </div>
      <div class="user__buttons">
        <div class="user__buttonsAdd">
          <div
            v-for="button in buttons"
            :key="button"
            class="button"
            :class="{button_disabled: !isAdmin}"
            @click="addPoints(button, user)"
          >
            <span class="forDesctop">{{ longButtonTitle }}</span>
            <span class="forMobile">{{ shortButtonTitle }}</span>
            {{ button }}
          </div>
        </div>
        <div class="user__buttonsDelete">
          <div
            class="button button_decline"
            :class="{button_disabled: !isAdmin}"
            @click="clearUser(user.key)"
          >
            Очистить
          </div>
          <div
            class="button button_decline"
            :class="{button_disabled: !isAdmin}"
            @click="removeUser(user.key, index)"
          >
            Удалить
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useUsersStore from '@/store/usersStore';
import { defineProps, toRefs, ref, computed } from 'vue';
import firebase from 'firebase';
import useBaseStore from '@/store/baseStore';
import { Icon } from '@iconify/vue';
import {showNotificationMessage, preventEditingForNotAdmins} from '@/utils/notifications';
import { notify } from '@kyvg/vue3-notification';;

// const showNotificationMessage = (text="", type="success") => {
//   notify({ type, text });
// }

const props = defineProps({
  user: {
    type: Object,
  },
  userIndex: {
    type: Number,
  }, 
});

const { user, userIndex } = toRefs(props);

const baseStore = useBaseStore();

const { isAdmin } = storeToRefs(baseStore);

const usersStore = useUsersStore();

const { users } = storeToRefs(usersStore);

const buttons = [1, 5, 10];

const increasePoints = ref(true);
const pointsToChange = ref(null);

const longButtonTitle = computed(() => {
  return increasePoints.value ? 'Добавить' : 'Отнять';
});
const shortButtonTitle = computed(() => {
  return increasePoints.value ? '+' : '-';
});

const hasCrown = computed(() => {
  return userIndex.value === 0 && user.value.points > 0;
})

const changePoints = (value) => {
  return increasePoints.value
    ? user.value.points += value
    : user.value.points -= value;
}

// const preventEditingForNotAdmins = () => {
//   if(!isAdmin.value) {
//     showNotificationMessage('Нет прав для изменения данных', 'error');
//     return true;
//   }
// }

const acceptChangePoints = async () => {
  if (preventEditingForNotAdmins(isAdmin.value)) return;
  if(!pointsToChange.value) {
    showNotificationMessage('Введите количество баллов', 'warn')
    return;
  }
  changePoints(pointsToChange.value);
  baseStore.showLoader();
  await firebase.database().ref('users').child(user.value.key).update({points: user.value.points});
  pointsToChange.value = null;
  baseStore.hideLoader();
};

const plusPointsActive = computed(() => {
  return increasePoints.value === true;
});

const plusMinus = (value) => {
  increasePoints.value = value;
}

const criticalLimit = (points) => {
  return points > 10;
};

const addPoints = async (points, user) => {
  if (preventEditingForNotAdmins(isAdmin.value)) return;
  baseStore.showLoader();
  changePoints(points);
  await firebase.database().ref('users').child(user.key).update({points: user.points});
  baseStore.hideLoader();
};

const clearUser = async (key) => {
  if (preventEditingForNotAdmins(isAdmin.value)) return;
  baseStore.showLoader();
  user.value.points = 0;
  await firebase.database().ref('users').child(key).update({points: 0});
  baseStore.hideLoader();
};

const removeUser = async (key) => {
  if (preventEditingForNotAdmins(isAdmin.value)) return;
  baseStore.showLoader();
  await firebase.database().ref('users').child(key).remove();
  usersStore.removeUser(key);
  baseStore.hideLoader();
};
</script>

<style lang="scss" scoped>
  .vue-notification {
    z-index: 100 !important;
  }
  p { 
    margin: 0 0 10px;
  }

.user {
  position: relative;
  border: 3px solid $secondaryBG;
  padding: 10px;
  border-radius: $borderRadius;
  // box-shadow: 0px 0px 19px -4px rgba(74, 78, 105, .75);
  box-shadow: 0px 0px 19px -4px rgba(0, 0, 0, .75);

  & + & {
    margin-top: 30px;
  }

  &__crown::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    right: 5px;
    top: 0;
    // translate: (0 calc(-100% - 3px));
    background-image: $crownIcon;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    // background-color: red;
  }

  &__outlined {
    border-color: $contrastColor;
  }

  &__title {
  }

  &__adminButtons {
  }

  &__togglePointsDirection {
  }

  &__togglePointsDirectionItem {
    position: relative;
    width: 2rem;
    height: 2rem;
    display: inline-grid;
    place-items: center;
    background-color: $secondaryBG;
    border-radius: $borderRadius;
    cursor: pointer;

    svg {
      transition: color .2s;
    }

    &_plus.active svg {
      color: $confirmColor;
    }

    &_minus.active svg {
      color: $declineColor;
    }

    & + & {
      margin-left: 10px;
    }
  }

  &__addPoints {
    margin: 10px 0;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
  }
}

.forMobile {
  display: none;
}

@media screen and (max-width: 900px) {
  .forDesctop{
    display: none;
  }
  .forMobile {
    display: inline-block;
  }
}

@media screen and (max-width: 550px) {
  .user__buttons {
    display: flex;
    flex-direction: column;
  }

  .user__buttonsDelete {
    margin-top: 10px;
  }
}

@media screen and (max-width: 400px) {
  .user__buttonsAdd {
    display: flex;
    flex-direction: column;

    .button {
      &:not(:nth-child(1)) {
        margin: 10px 0 0;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .user__addPoints {
    .input {
      display: block;
      width: 100%;
    }
    .button {
      margin: 10px 0 0;
    }
  }
}

@media screen and (max-width: 300px) {
  .user__addPoints {
    .button {
      display: block;
      margin-bottom: 20px;
    }
  }
  .user__buttonsDelete {
    .button {
      display: block;

      &:not(:nth-child(1)) {
        margin: 10px 0 0;
      }
    }
  }
}

  // __buttonsAdd
</style>