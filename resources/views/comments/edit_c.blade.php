<x-app-layout>
    <div class='px-6 py-4'>
        <!--編集フォーム-->
        <form action='/comment/{{ $comment->id }}/update' method='POST'>
        @csrf
        @method('PUT')
            <div>
                <x-input-label for="comment" :value="__('コメントを入力：')" />
                <x-text-input id='comment' name='comment' class="mt-1 block w-full h-20" :value="old('comment', $comment->body)" />
                <x-input-error :messages="$errors->get('comment')" class="mt-2" />
            </div>
            <div class='pt-2'>
                <x-primary-button>{{ __('保存') }}</x-primary-button>
            </div>
        </form>
    
    
        <!--キャンセルボタン-->
        <div class="py-4">
            <a href="/questions/{{ $comment->question()->get()[0]->id }}">
                <x-primary-button class="">
                    {{ __('キャンセル') }}
                </x-primary-button>
            </a>
        </div>
    
        <!-- 削除ボタン -->
        <div class='py4'>
            
            <x-danger-button x-data=""
            x-on:click.prevent="$dispatch('open-modal', 'confirm-comment-deletion')">
                {{ __('削除') }}</x-danger-button>
            <x-modal name="confirm-comment-deletion" :show="$errors->isNotEmpty()" focusable>
                
                <form method="post" action="/comment/{{ $comment->id }}/delete" class="p-6">
                    @csrf
                    @method('delete')
        
                    <h2 class="text-lg font-medium text-gray-900">
                        {{ __('このコメントを削除しますか？') }}
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
    </div>
</x-app-layout>