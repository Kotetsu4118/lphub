<x-app-layout>
    <form action="/questions" method="POST">
    @csrf
        
        <div class='py-2 pl-3'>
            <div class="py-4">
                @component('components/select_language', ['languages'=>$languages, 'selected'=>NULL])
                @endcomponent
                <x-input-error :messages="$errors->first('language_id')" class="mt-2" />

            </div>
            
            {{--
            <x-select_language>
                {{['languages'=>$languages]}}
            </x-select_language>
            --}}
            
            <div class='py-4'>
                
                <x-input-label for="title" :value="__('タイトル')" />
                <x-text-input id='title' name='question[title]' class="mt-1 block w-full h-8" :value="old('question.title')" />
                <x-input-error :messages="$errors->get('question.title')" class="mt-2" />

                    
            </div>
            
            <div class='py-4'>
                
                <x-input-label for="body" :value="__('問題')" />
                <x-text-input id='body' name='question[body]' class="mt-1 block w-full h-20" :value="old('question.body')" />
                <x-input-error :messages="$errors->get('question.body')" class="mt-2" />
                    
            </div>
            
            <div class='py-4'>
                
                <x-input-label for="answer" :value="__('答え')" />
                <x-text-input id='answer' name='question[answer]' class="mt-1 block w-full h-20" :value="old('question.answer')" />
                <x-input-error :messages="$errors->get('question.answer')" class="mt-2" />
                    
            </div>
            
            <div class='py-2'>
                タグの設定：   
            </div>
            
            <div>
                @component('components/check_tags', ['tags'=>$tags, 'checked_tag'=>NULL])
                @endcomponent
            </div>
            
            <div class='py-2'>
                <a href={{ route('create_t') }}>
                    タグを作成
                </a>
            </div>
    
        
            <div class="flex space-x-8 py-4">
                {{--
                @component('components/submit_button')
                @endcomponent
                --}}
                
                <x-primary-button>{{ __('Save') }}</x-primary-button>
            </div>
        
        </div>
    </form>
        <a href="/">
            <button class="ml-4">
                {{ __('キャンセル') }}
            </button>
        </a>
</x-app-layout>