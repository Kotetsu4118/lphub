<x-app-layout>
    <form action="/questions/{{ $question->id }}" method="POST">
    @csrf
    @method('PUT')
    
        <div class='py-2 pl-3'>
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
            

            
            
            <div>
                {{-- 紐づけ済みは点灯・まだのやつは非点灯にする --}}
                @component('components/check_tags', ['tags'=>$tags, 'checked_tag'=>$checked_tag])
                @endcomponent
                
            </div>
            
            <!--保存ボタンを作る-->
            <div class="flex space-x-8 py-4">
                
                <x-primary-button>{{ __('Save') }}</x-primary-button>
            </div>
            
            
        </div>
    </form>
    
    <div class="py-4">
        <a href="/questions/{{ $question->id }}">
            <x-primary-button class="ml-4">
                {{ __('キャンセル') }}
            </x-primary-button>
        </a>
    </div>
    
</x-app-layout>