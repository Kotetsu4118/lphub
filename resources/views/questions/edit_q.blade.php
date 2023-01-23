<x-app-layout>
    <form action="/questions/{{ $question->id }}" method="POST">
        @csrf
        @method('PUT')
    
        <div class='pt-2 pl-3'>
            <div class="py-4">
                @component('components/select_language', ['selected'=>$question->language , 'languages'=>$languages])
                @endcomponent
                
                <x-input-error :messages="$errors->first('question.language_id')" class="mt-2" />
                
            </div>
            
            
            <div class='py-4'>
                
                <x-input-label for="title" :value="__('タイトル')" />
                <x-text-input id='title' name='question[title]' class="mt-1 block w-full h-8" :value="old('question.title', $question->title)" />
                <x-input-error :messages="$errors->get('question.title')" class="mt-2" />
                    
            </div>
            
        
            <div class='py-4'>
                
                <x-input-label for="body" :value="__('問題')" />
                <x-text-input id='body' name='question[body]' class="mt-1 block w-full h-20" :value="old('question.body', $question->body)"/>
                <x-input-error :messages="$errors->get('question.body')" class="mt-2" />
                    
            </div>
            
            <div class='py-4'>
                
                <x-input-label for="answer" :value="__('答え')" />
                <x-text-input id='answer' name='question[answer]' class="mt-1 block w-full h-20" :value="old('question.answer', $question->answer)"/>
                <x-input-error :messages="$errors->get('question.answer')" class="mt-2" />
                    
            </div>
            

            <div class='py-2'>
                タグの設定：   
            </div>
            
            <div>
                {{-- 紐づけ済みは点灯・まだのやつは非点灯にする --}}
                @component('components/check_tags', ['tags'=>$tags, 'checked_tag'=>$checked_tag])
                @endcomponent
            </div>
            
            <div class="py-2">
                <x-primary-button>{{ __('保存') }}</x-primary-button>
            </div>
            
        </div>
    </form>
    
    <div class="py-4 pl-3">
        <a href="/questions/{{ $question->id }}">
            <x-primary-button class="">
                {{ __('キャンセル') }}
            </x-primary-button>
        </a>
    </div>
    
    <!-- 削除ボタン -->
    
    <div class='pl-3 py4'>
        
        <x-danger-button x-data=""
        x-on:click.prevent="$dispatch('open-modal', 'confirm-question-deletion')">
            {{ __('削除') }}</x-danger-button>
        <x-modal name="confirm-question-deletion" :show="$errors->isNotEmpty()" focusable>
            
            <form method="post" action="/questions/{{ $question->id }}" class="p-6">
                @csrf
                @method('delete')
    
                <h2 class="text-lg font-medium text-gray-900">
                    {{ __('この問題を削除しますか？') }}
                </h2>
    
                <p class="mt-1 text-sm text-gray-600">
                    {{ __('削除する場合は「確認」を入力してください') }}
                </p>
    
                <div class="mt-6">
                    <x-input-label for="confirm" class="sr-only" />
    
                    <x-text-input
                        id="confirm"
                        name="confirm"
                        type="text"
                        class="mt-1 block w-3/4"
                        placeholder="確認"
                        :value="old('confirm')"
                    />
                    
                    <x-input-error :messages="$errors->get('confirm')" class="mt-2" />
                </div>
    
                <div class="mt-6 flex justify-end">
                    <x-secondary-button x-on:click="$dispatch('close')">
                        {{ __('キャンセル') }}
                    </x-secondary-button>
    
                    <x-danger-button class="ml-3">
                        {{ __('削除') }}
                    </x-danger-button>
                </div>
            </form>
        </x-modal>
    </div>
</x-app-layout>