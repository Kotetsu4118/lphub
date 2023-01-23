<x-app-layout>

    {{--    
    <div class="py-4 pl-3">
        @component('components/select_language',[
            'languages' => $languages,
            'selected'=>NULL,
        ])
        @endcomponent
    </div>
    --}}
    
    
    
    <div class="pt-2">
        <div class='flex pl-3'>
                {{ $search_word }} の検索結果
        </div>
        
        <div>
            <form action='/home_search/{search_word}' method='GET'>
                <div class='flex'>
                    <x-text-input id='search_word' name='search_word' class="mt-1 block w-full h-8" :value="old('search_word')"/>
                    <x-input-error :messages="$errors->get('search_word')" class="mt-2" />
                    
                    <x-primary-button>{{ __('検索') }}</x-primary-button>
                
                </div>
            </form>
        </div>
        
        @if(!$questions[0])
            <div class=''>
                一致する問題がありませんでした。
            </div>
        @endif
        
        @include('layouts.home_layout')

</x-app-layout>