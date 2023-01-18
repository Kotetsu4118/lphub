<x-app-layout>
    <form action="" method="POST">
    @csrf
        <div class='py-2 pl-3'>
            <div class="py-4">
                @component('components/select_language', ['languages'=>$languages, 'selected'=>NULL])
                @endcomponent
                <x-input-error :messages="$errors->first('question.language_id')" class="mt-2" />
            </div>
            
            <div class='py-4'>
                <x-input-label for="name" :value="__('タグ名')" />
                <x-text-input id='title' name='name' class="mt-1 block w-full h-8" :value="old('name')" />
                <x-input-error :messages="$errors->get('name')" class="mt-2" />
            </div>
            
            <x-primary-button>{{ __('Save') }}</x-primary-button>
        </div>
    </form>
    
    <!--飛ばす先は後で検討-->
    <a href="/">
        <button class="ml-4">
            {{ __('キャンセル') }}
        </button>
    </a>
    
    
</x-app-layout>